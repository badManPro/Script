 var fs = require('fs')

 var dirName = process.argv[2] 
 var path = "./" + dirName
 process.chdir("/Users/Lucifer/Documents/Git/Script/node") // cd 目录（路径自己改）
  if (fs.existsSync(path)) {
     console.log("existence address");
     process.exit(1)
  } else {
    fs.mkdirSync(path) // mkdir $1
    process.chdir(path) // cd $1
    fs.mkdirSync('css') // mkdir css
    fs.mkdirSync('js') // mkdir js
   
    fs.writeFileSync("./index.html", "<!DOCTYOE>\n<title>Hello</title>\n<h1>Hi</h1>")
    fs.writeFileSync("css/style.css", "h1{color: red;}")
    fs.writeFileSync("./js/main.js", 'var string = "Hello World"\nalert(string)')
    process.exit(0)   
}
 