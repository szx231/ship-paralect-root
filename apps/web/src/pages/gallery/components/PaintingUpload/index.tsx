import { memo, useState } from 'react';
import { Group, Text, Stack } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPlus } from '@tabler/icons-react';

import { handleError } from 'utils';
import { galleryApi } from 'resources/gallery';
import { accountApi } from 'resources/account';

import { useStyles } from './styles';

const PaintingUpload = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { classes, cx } = useStyles();

  const { data: account } = accountApi.useGet();

  const { mutate: uploadPainting, isLoading, isError } = galleryApi.useUploadPainting<FormData>();

  if (!account) return null;

  const isFileSizeCorrect = (file: any) => {
    const oneMBinBytes = 1048576;
    if (file.size / oneMBinBytes > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG or PNG Paintings.');
    return false;
  };

  const handlePaintingUpload = async ([imageFile]: FileWithPath[]) => {
    setErrorMessage(null);

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);

      await uploadPainting(body, {
        onError: (err) => handleError(err),
      });
    }
  };

  return (
    <>
      {isLoading && <div>loading....</div>}
      {isError && <div>Ошибка....</div>}
      <Stack>
        <Group align="flex-start" spacing={32}>
          <Stack align="center" spacing={10}>
            <Dropzone
              name="paintingUrl"
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              onDrop={handlePaintingUpload}
              classNames={{
                root: classes.dropzoneRoot,
              }}
            >
              <label
                className={cx(classes.browseButton, {
                  [classes.error]: errorMessage,
                })}
              >
                <IconPlus className={classes.addIcon} />
              </label>
            </Dropzone>
          </Stack>
          <Stack spacing={4} pt={6}>
            <Text weight={600} size="lg">
              Add Painting
            </Text>
            <Text className={classes.text}>JPG, JPEG or PNG Max size = 2MB</Text>
          </Stack>
        </Group>
      </Stack>
      {!!errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default memo(PaintingUpload);
