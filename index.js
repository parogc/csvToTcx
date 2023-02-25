import csvToJson from "convert-csv-to-json"
import Parser from "js2xmlparser"
import fs from "fs"

const options = {
    indent: true,
}
let jsonCsv = csvToJson.formatValueByType().fieldDelimiter(',').getJsonFromCsv("./input/track.csv");
let json = prepareToConvertToXml(jsonCsv)
const xml = Parser.parse("TrainingCenterDatabase", json);
var xmlo = xml.replace(/'/g, '"');


fs.writeFile("./output/track.tcx", xmlo, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

function prepareToConvertToXml(val) {
    

    let Track = []

    for(let i=0; i<val.length;i++){
        Track.push(
        {
            "Time": new Date(val[i].Time).toISOString(),
            "Position": {
                "LatitudeDegrees" :val[i].LatitudeDegrees,
                "LongitudeDegrees" :val[i].LongitudeDegrees
            },
            "AltitudeMeters" :val[i].AltitudeMeters,
            "DistanceMeters" :val[i].DistanceMeters,
            "HeartRateBpm":{
                "Value": val[i].HeartRateBpm + 1,
            },
            "Cadence" :val[i].Cadence < 0 ? 0 : val[i].Cadence,
            "Extensions": {
                "TPX":{
                    "@": {
                        xmlns: "http://www.garmin.com/xmlschemas/ActivityExtension/v2",
                    },
                    "Speed": val[i].Speed/10,
                    "Range": val[i].Range,
                    "BatteryPercentage": val[i].BatteryPercentage,
                    "AssistRatio": val[i].AssistRatio,
                    "Watts": val[i].Watts
                }
               
            
        }
        })
    }
    let obj = {
            "@": {
                "xsi:schemaLocation" : "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd",
                "xmlns:ns5" : "http://www.garmin.com/xmlschemas/ActivityGoals/v1",
                "xmlns:ns3" : "http://www.garmin.com/xmlschemas/ActivityExtension/v2",
                "xmlns:ns2":"http://www.garmin.com/xmlschemas/UserProfile/v2",
                 "xmlns":"http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2",
                  "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance"
            },
            "Activities":{
                "Activity": {
                    "@" : {
                        "Sport":"Biking"
                    },
                    "Id": "2020-05-25T17:54:59Z",
                    "Lap": {
                        "@" : {
                            "StartTime": "2020-05-16T17:54:59Z"
                        },
                        "TotalTimeSeconds": "2000",
                        "DistanceMeters":"5000",
                        "MaximumSpeed": 25,
                        "Calories" : 45,
                        "AverageHeartRateBpm": {
                            "Value": 141
                        },
                        "MaximumHeartRateBpm":{
                            "Value": 158
                        },
                        "Intensity": "Active",
                        "TriggerMethod":"Manual",
                        "Track": {
                            "Trackpoint":Track
                        }

                    }
                }
            }
        
    }

    return obj

} 