const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const DB_URL = "mongodb+srv://person1:person1@person1.uodeo.mongodb.net/registration?retryWrites=true&w=majority"
const path = require('path')



// app.use(express.static(path.join(__dirname,'build')))
app.use(bodyParser.json())

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'build','index.html'))
// })


let StudentSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    typeOfProgram:String,
    Specialization:String,
    classroom:String,
    code:Number,
    sheets:Number,
    lecture:Number,
    area:Number,
    behavior:Number
})


let groupSchema = mongoose.Schema({
    name:String,
    students:[],
    week1:{
        day1:{Period:{number:Number,name:String}},
        day2:{Period:{number:Number,name:String}},
        day3:{Period:{number:Number,name:String}},
        day4:{Period:{number:Number,name:String}},
    },
    week2:{
        day1:{Period:{number:Number,name:String}},
        day2:{Period:{number:Number,name:String}},
        day3:{Period:{number:Number,name:String}},
        day4:{Period:{number:Number,name:String}},
    },
    week3:{
        day1:{Period:{number:Number,name:String}},
        day2:{Period:{number:Number,name:String}},
        day3:{Period:{number:Number,name:String}},
        day4:{Period:{number:Number,name:String}},
    },
    week4:{
        day1:{Period:{number:Number,name:String}},
        day2:{Period:{number:Number,name:String}},
        day3:{Period:{number:Number,name:String}},
        day4:{Period:{number:Number,name:String}},
    },
    number:Number
})




let areaSchema = mongoose.Schema({
    name:String,
    week1:{
        Sunday:{first:Number,second:Number},
        Monday:{first:Number,second:Number},
        Tuesday:{first:Number,second:Number},
        Wednesday:{first:Number,second:Number},
    },
    week2:{
        Sunday:{first:Number,second:Number},
        Monday:{first:Number,second:Number},
        Tuesday:{first:Number,second:Number},
        Wednesday:{first:Number,second:Number},
    },
    week3:{
        Sunday:{first:Number,second:Number},
        Monday:{first:Number,second:Number},
        Tuesday:{first:Number,second:Number},
        Wednesday:{first:Number,second:Number},
    },
    week4:{
        Sunday:{first:Number,second:Number},
        Monday:{first:Number,second:Number},
        Tuesday:{first:Number,second:Number},
        Wednesday:{first:Number,second:Number},
    }
})


let Student = mongoose.model('student',StudentSchema)
let Groups = mongoose.model('group',groupSchema)
let Areas = mongoose.model('area',areaSchema)

let getGroups = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
            return Groups.find().then((groups)=>{
                mongoose.disconnect()
                resolve(groups)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}




let getStudents = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
            return Student.find()
        }).then((students)=>{
            mongoose.disconnect()
            resolve(students)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



    let sheetDegree = (code,degree)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Student.findOneAndUpdate({code:code},{sheets:degree})
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    }

    let lectureDegree = (code,degree)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Student.findOneAndUpdate({code:code},{lecture:degree})
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    }


    let areaDegree = (code,degree)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Student.findOneAndUpdate({code:code},{area:degree})
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    }


    let behaviorDegree = (code,degree)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Student.findOneAndUpdate({code:code},{behavior:degree}).then(()=>{
                    mongoose.disconnect()
                    resolve()
                    }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                    })
                })
            })
    }

    let deleteStudent = (code)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Student.deleteOne({code:code})
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    }



    let deleteStudentfromgroup = (studentName,groupName)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }).then(()=>{
                return Groups.findOneAndUpdate({name:groupName},{
                    $pull:{
                        students:studentName
                    }
                }).then(()=>{
                    mongoose.disconnect()
                    resolve()
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            })
        })
    }
// create api
app.get('/students',(req,res)=>{
     getStudents().then((students)=>{
         res.json({data:students})
     })
})

app.get('/groups',(req,res)=>{
    getGroups().then((groups)=>{
        res.json({groups:groups})
    })
})



app.put('/sheetDegree',bodyParser.urlencoded({extended:true}),(req,res)=>{
    sheetDegree(req.body.code,req.body.degree).then(()=>{res.send('done')})
})

app.put('/lectureDegree',bodyParser.urlencoded({extended:true}),(req,res)=>{
    lectureDegree(req.body.code,req.body.degree).then(()=>{res.send('done')})
})

app.put('/areaDegree',bodyParser.urlencoded({extended:true}),(req,res)=>{
    areaDegree(req.body.code,req.body.degree).then(()=>{res.send('done')})
})

app.put('/behaviorDegree',bodyParser.urlencoded({extended:true}),(req,res)=>{

    behaviorDegree(req.body.code,req.body.degree).then(()=>{res.send('done')})
})

app.delete('/deleteStudent',bodyParser.urlencoded({extended:true}),(req,res)=>{
   deleteStudent(req.body.code).then(()=>{res.send('done')})
})

app.put('/editGroup',bodyParser.urlencoded({extended:true}),(req,res)=>{
    deleteStudentfromgroup(req.body.studentName,req.body.groupName).then(()=>{ res.send('done') })
})



app.listen(5500,()=>{console.log('server run')})