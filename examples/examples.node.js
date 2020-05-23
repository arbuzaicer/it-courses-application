/*createFile.readdir(__dirname, (err, data) => { пример с чтением файлов в папке и выбором файлов с нужным расширением
    const exts = data.filter(item=>path.extname(item)==='.json')
    console.log(exts)
})*/

/*---------------------------------------------------------------------------------------------------------------------*/

/*
createFile.mkdir(path.join(__dirname, 'test'), err=> { создание папки в корневой директории
    if (err) throw err;
    console.log('Folder was created')
});
*/

/*---------------------------------------------------------------------------------------------------------------------*/

/*
const createFileFunc = () => createFile.writeFile(path.join(__dirname, 'test', 'docData.txt'), 'Content from nodeJS', err => {
    if(err) throw err; //создание файла в корневой директории
    console.log('File created')
});*/
