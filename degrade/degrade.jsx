var counter = 0

var myFile = File.openDialog("Choose an Image")
if (myFile != null) {
  app.open(myFile)
}

var newFolder
if (!myFile.path + "/processed") {
  newFolder = new Folder(myFile.path + "/processed")
  newFolder.create()
}

app.preferences.rulerUnits = Units.PIXELS

for (var i = 0; i <= 5; i++) {
  var jpg = new ExportOptionsSaveForWeb()
  jpg.format = SaveDocumentType.JPEG
  jpg.quality = 0
  jpg.optimized = false
  jpg.includeProfile = false

  var currWidth = app.activeDocument.width
  var currHeight = app.activeDocument.height

  app.activeDocument.crop([
    Math.round(Math.random()),
    Math.round(Math.random()),
    currWidth - Math.round(Math.random()),
    currHeight - Math.round(Math.random()),
  ])

  var fileNameArr = myFile.displayName.split(".")
  var currentFile = File(
    newFolder.absoluteURI +
      "/" +
      fileNameArr[0] +
      counter +
      "." +
      fileNameArr[1]
  )

  app.activeDocument.exportDocument(currentFile, ExportType.SAVEFORWEB, jpg)

  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)

  open(currentFile)
  counter++
}
