import React, { useState, useCallback, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const onException = (cb, errorHandler) => {
  try {
    return cb();
  } catch (err) {
    if (errorHandler) {
      return errorHandler(err);
    }
    console.error(err);
  }
};

const setupDirectory = async (directory) => {
  const dir = await FileSystem.getInfoAsync(directory);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(directory);
  }
};

const cleanDirectory = async (directory) => {
  await FileSystem.deleteAsync(directory);
};

const copyFile = async (file, newLocation) => {
  return await onException(() => FileSystem.copyAsync({
      from: file,
      to: newLocation
  }));
};

const useFileSystem = ({ directory: propDirectory }) => {
  const directory = `${FileSystem.documentDirectory}${propDirectory}`;

  const addFile = useCallback(async (fileLocation, fileType = 'image') => {
    const folderSplit = fileLocation.split('/');
    const fileName = folderSplit[folderSplit.length - 1];
    await onException(() => copyFile(fileLocation, `${directory}/${fileName}`));

    return {
      name: fileName,
      type: fileType,
      file: await loadFile(fileName)
    };
  }, [directory]);

  const removeFile = useCallback(async (fileName) => {
    return await onException(() => FileSystem.deleteAsync(`${directory}/${fileName}`, { idempotent: true }));
  }, [directory]);

  const loadFile = useCallback(async (fileName, type = 'text') => {
    return await onException(() => FileSystem.readAsStringAsync(`${directory}/${fileName}`, {
      encoding: type === 'image' ? FileSystem.EncodingType.Base64 : FileSystem.EncodingType.UTF8,
    }));
  }, [directory]);

  getAllFiles = useCallback(async () => {
    await setupDirectory(directory);

    const result = await onException(() => FileSystem.readDirectoryAsync(directory));
    return Promise.all(await result.map(async (fileName) => {
      return {
        name: fileName,
        file: JSON.parse(await loadFile(fileName)),
      };
    }));
  }, [directory]);

  useEffect(() => {
    async function runAsync() {
      await setupDirectory(directory);
      await FileSystem.writeAsStringAsync(directory + '/mydude.json', JSON.stringify({ name: 'bobs', phoneNumber: '4206969', photo: null }));
      await FileSystem.writeAsStringAsync(directory + '/mydudette.json', JSON.stringify({ name: 'allison', phoneNumber: '6661337', photo: null }));
    }
    // runAsync();
  }, [directory])

  return [getAllFiles];

}

export default useFileSystem;
