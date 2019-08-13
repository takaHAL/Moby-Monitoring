const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const iconvLite = require('iconv-lite')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const execSync = require('child_process').execSync

app.get('/containerStatus', function(req, res) {
  const info = JSON.parse(execSync(
    '/usr/local/bin/docker info --format "{{json .}}"'
  ).toString())

  const df = execSync(
    '/usr/local/bin/docker system df --format "{{json .}}"'
  ).toString()
  
  let dfData = []
  df.split(/\r?\n/g).forEach(item => {
    if(item.length !== 0){
      dfData.push(JSON.parse(item))
    }
  })

  let dockerData = [
    info.Containers,
    info.ContainersRunning,
    info.ContainersStopped,
    info.ContainersPaused,
    dfData[1].Active,
    dfData[1].Size,
    dfData[1].Reclaimable,
    dfData[0].TotalCount,
    dfData[0].Active,
    dfData[0].Size,
    dfData[0].Reclaimable,
    dfData[2].TotalCount,
    dfData[2].Active,
    dfData[2].Size,
    dfData[2].Reclaimable,
  ]

  res.send({
    dockerData: dockerData,
    test: info,
    df: dfData
  })
})

// コンテナのメトリクスを監視
app.get('/containerStats', function(req,res) {
  const execSync = require('child_process').execSync;
  const result = execSync(
    '/usr/local/bin/docker stats --no-stream --format [\"{{ .Name }}\",\"{{ .CPUPerc }}\",\"{{ .MemPerc }}\",\"{{ .NetIO }}\"],'
  ).toString();

  res.send({
    containerData: persentParse(jsonParse(result)),
    containerList: getContainerList(jsonParse(result))
  })
})

const persentParse = (val) => {
  val.forEach(item => {
    item[1] = Number(item[1].replace('%',''))
    item[2] = Number(item[2].replace('%',''))
  })
  return val
}

const getContainerList = (val) => {
  const containerList = []
  val.forEach(item => {
    containerList.push(item[0])
  })
  return containerList
}

// docker system df

// get value of docker inspect
app.get('/containerInspect/:id', function(req,res) {
  const id = req.params.id
  const execSync = require('child_process').execSync;
  const result = execSync(
    `/usr/local/bin/docker inspect ${id}`
  ).toString();
  
  // response
  res.send({
    result: result
  })
})

// get docker logs
app.get('/containerLogs/:id', function(req,res) {
    const id = req.params.id
    const execSync = require('child_process').execSync;
    let result = execSync(
      `/usr/local/bin/docker logs ${id}`
    ).toString();
    
    // result = iconvLite.decode(result, 'shift-jis')

    // response
    res.send({
      result: result
    })
})

// いい感じにパースする
const jsonParse = (str) => {
  let dataAry = []
  let data = str.replace(/\r?\n/g, '')
  data = data.split("],")
  
  data.forEach(items => {
    data = items.replace(/"/g,'').replace("[","")
    if( data ){
      dataAry.push(data.split(","))
    }
  })
  return dataAry
}

app.listen(process.env.PORT || 7000)