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

const useFileSystem = (propDirectory) => {
  const directory = `${FileSystem.documentDirectory}${propDirectory}`;

  const loadFile = useCallback(async (fileName, type = 'text') => {
    return await onException(() => FileSystem.readAsStringAsync(`${directory}/${fileName}`, {
      encoding: type === 'image' ? FileSystem.EncodingType.Base64 : FileSystem.EncodingType.UTF8,
    }));
  }, [directory]);

  const addFile = useCallback(async (fileLocation, newFileName, fileType = 'text') => {
    const folderSplit = fileLocation.split('/');
    const extension = folderSplit[folderSplit.length - 1].split('.')[1];
    const newFileLocation = `${directory}/${newFileName}.${extension}`;
    await onException(() => copyFile(fileLocation, newFileLocation));

    return {
      name: newFileName,
      uri: newFileLocation,
      file: await loadFile(newFileName, fileType)
    };
  }, [directory]);

  const removeFile = useCallback(async (fileName) => {
    return await onException(() => FileSystem.deleteAsync(`${directory}/${fileName}`, { idempotent: true }));
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

  return [getAllFiles, addFile];

}

export default useFileSystem;
