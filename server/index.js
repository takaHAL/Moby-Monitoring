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
    df: dfData
  })
})

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

app.get('/containerInspect/:id', function(req,res) {
  const id = req.params.id
  const execSync = require('child_process').execSync;
  const result = execSync(
    `/usr/local/bin/docker inspect ${id}`
  ).toString();

  res.send({
    result: result
  })
})

// get docker logs
app.get('/containerLogs/:id', function(req,res) {
    const id = req.params.id
    const execSync = require('child_process').execSync;
    let result = execSync(
      `/usr/local/bin/docker logs -t ${id}`
    ).toString();

    // result = iconvLite.decode(result, 'shift-jis')

    // response
    res.send({
      result: result
    })
})

//docker の起動など
app.get('/containerAction/:action/:id', function(req,res) {
  const id = req.params.id
  const action = req.params.action
  const execSync = require('child_process').execSync;
  const result = execSync(
    `/usr/local/bin/docker ${action} ${id}`
  ).toString();
  res.send({
    result: result
  })
})


app.get('/dockerInfo', function(req,res) {
  const info = JSON.parse(dockerInfo())
  const infoData = [
    info.OSType,info.OperatingSystem,info.ServerVersion,
    info.KernelVersion,info.HttpProxy,info.HttpsProxy,
  ]
  res.send({
    info: infoData
  })
})

app.get('/dataTable', function(req,res) {
  const ls = dockerLs()
  let lsData = []

  ls.split(/\r?\n/g).forEach(item => {
    if(item.length !== 0){
      lsData.push({
        id: JSON.parse(item).ID,
        names: JSON.parse(item).Names,
        networks: JSON.parse(item).Networks,
        ports: JSON.parse(item).Ports,
        running: JSON.parse(item).RunningFor,
      })
    }
  })

  res.send({
    ls: lsData
  })
})

app.get('/dataTableAll', function(req,res) {
  const ls = dockerPsAll()
  let psAllData = []

  ls.split(/\r?\n/g).forEach(item => {
    if(item.length !== 0){
      psAllData.push({
        id: JSON.parse(item).ID,
        names: JSON.parse(item).Names,
        status: JSON.parse(item).Status,
        ports: JSON.parse(item).Ports,
        running: JSON.parse(item).RunningFor,
      })
    }
  })

  res.send({
    psAll: psAllData
  })
})

app.get('/detailsDialog/:id', function(req,res) {
  const id = req.params.id
  const inspect = dockerInspect(id)
  const networkName = inspect[0].HostConfig.NetworkMode
  const networkSetting = {
    ipaddress: inspect[0].NetworkSettings.Networks[networkName].IPAddress,
    gateway: inspect[0].NetworkSettings.Networks[networkName].Gateway,
    macaddress: inspect[0].NetworkSettings.Networks[networkName].MacAddress,
    ipv6address: inspect[0].NetworkSettings.Networks[networkName].GlobalIPv6Address,
    ipv6gateway: inspect[0].NetworkSettings.Networks[networkName].IPv6Gateway
  }
  const configData = {
    cmd: inspect[0].Config.Cmd,
    env: inspect[0].Config.Env,
    image: inspect[0].Config.Image,
    hostname: inspect[0].Config.Hostname,
    volumes: inspect[0].Config.Volumes,
  }

  res.send({
    network: networkSetting,
    config: configData
  })
})

const dockerLs = () => {
  const execSync = require('child_process').execSync;
  const data = execSync(
    '/usr/local/bin/docker container ls --format "{{json .}}"'
  ).toString()
  return data
}

const dockerPsAll = () => {
  const execSync = require('child_process').execSync;
  const data = execSync(
    '/usr/local/bin/docker ps -a --format "{{json .}}"'
  ).toString()
  return data
}

const dockerInfo = () => {
  const execSync = require('child_process').execSync;
  const data = execSync(
    '/usr/local/bin/docker info --format "{{json .}}"'
  ).toString()
  return data
}

const dockerInspect = (id) => {
  const execSync = require('child_process').execSync;
  let data = execSync(
    `/usr/local/bin/docker inspect ${id}`
  ).toString();
  return JSON.parse(data)
}

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

// %表記を数値にする
const persentParse = (val) => {
  val.forEach(item => {
    item[1] = Number(item[1].replace('%',''))
    item[2] = Number(item[2].replace('%',''))
  })
  return val
}

// コンテナの名前を一覧で取得
const getContainerList = (val) => {
  const containerList = []
  val.forEach(item => {
    containerList.push(item[0])
  })
  return containerList
}

app.listen(process.env.PORT || 7000)