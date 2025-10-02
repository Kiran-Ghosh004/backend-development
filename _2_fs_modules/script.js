
const fs=require('fs');


fs.writeFile('example.txt','Hello, Node.js!',(err)=>{
    if(err) console.log(err);
    console.log('File created and data written successfully.');
})

fs.appendFile('example.txt','hey hello how r you',(err)=>{
    if(err) console.log(err);
    console.log('File created and data written successfully.');
})

fs.rename('example.txt','sample.txt',(err)=>{
    if(err) console.log(err);
    console.log('File renamed successfully.');
})

fs.readFile('sample.txt','utf8',(err,data)=>{
    if(err) console.log(err);
    console.log(data);
})
fs.copyFile('sample.txt','copy.txt',(err)=>{
    if(err) console.log(err);
    console.log('File copied successfully.');
})

fs.unlink('copy.txt',(err)=>{
    if(err) console.log(err);
    console.log('File deleted successfully.');
})
fs.rmdir('myDirectory',(err)=>{
    if(err) console.log(err);
    console.log('Directory deleted successfully.');
})
fs.mkdir('myDirectory',(err)=>{
    if(err) console.log(err);
    console.log('Directory created successfully.');
})
fs.readdir('myDirectory',(err,files)=>{
    if(err) console.log(err);
    console.log(files);
})


// const os=require('os');  
// console.log(os.arch());
// console.log(os.freemem()/ (1024*1024*1024));
// console.log(os.totalmem()/ (1024*1024*1024));
// console.log(os.hostname());  
// console.log(os.platform());
// console.log(os.type());
// console.log(os.uptime()/3600);
// console.log(os.userInfo());
// const path=require('path');
// let dir=path.dirname('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(dir);    
// let ext=path.extname('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(ext);
// let base=path.basename('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(base);
// let parse=path.parse('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(parse);

// let join=path.join('C:/','Users','kiran','Desktop','Nodejs','_2_fs_modules','script.js');
// console.log(join);
// let resolve=path.resolve('C:/','Users','kiran','Desktop','Nodejs','_2_fs_modules','script.js');
// console.log(resolve);
// let isAbsolute=path.isAbsolute('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(isAbsolute);
// let isAbsolute1=path.isAbsolute('../_2_fs_modules/script.js');
// console.log(isAbsolute1);
// let relative=path.relative('C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js','C:/Users/kiran/Desktop/Nodejs');
// console.log(relative);

// let relative1=path.relative('C:/Users/kiran/Desktop/Nodejs','C:/Users/kiran/Desktop/Nodejs/_2_fs_modules/script.js');
// console.log(relative1);

