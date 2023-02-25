import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
import csvToJson from "csv-file-to-json";
import { toXML } from "jstoxml";
import moment from "moment";

const config = {
  indent: "    ",
};
const props = {
  showUploadList: false,
  className: "Dragger",
  beforeUpload(file, fileList) {
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        let jsonCsv = csvToJson({ data: evt.target.result });
        let json = prepareToConvertToXml(jsonCsv);

        const xml = toXML(json, config);

        var xmlo = xml.replace(/'/g, '"');

        download("track.tcx", '<?xml version="1.0"?> \n' + xmlo);
      };
    }
  },
};
const App = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </Dragger>
);

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function prepareToConvertToXml(val) {
  let Track = [];
  var sum = 0;
  for (let i = 1; i < val.length; i++) {
    sum = sum + 250;
    Track.push({
      _name: "Trackpoint",
      _content: {
        Time: moment.unix(val[i].Time / 1000 + sum).toISOString(),
        Position: {
          LatitudeDegrees: val[i].LatitudeDegrees,
          LongitudeDegrees: val[i].LongitudeDegrees,
        },
        AltitudeMeters: val[i].AltitudeMeters,
        DistanceMeters: val[i].DistanceMeters,
        HeartRateBpm: {
          Value: val[i].HeartRateBpm + 1,
        },
        Cadence: val[i].Cadence < 0 ? 0 : val[i].Cadence,
        Extensions: {
          TPX: {
            _attrs: {
              xmlns: "http://www.garmin.com/xmlschemas/ActivityExtension/v2",
            },
            Speed: val[i].Speed / 10,
            Range: val[i].Range,
            BatteryPercentage: val[i].BatteryPercentage,
            AssistRatio: val[i].AssistRatio,
            Watts: val[i].Watts,
          },
        },
      },
    });
  }

  let obj = {
    TrainingCenterDatabase: {
      _attrs: {
        "xsi:schemaLocation":
          "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd",
        "xmlns:ns5": "http://www.garmin.com/xmlschemas/ActivityGoals/v1",
        "xmlns:ns3": "http://www.garmin.com/xmlschemas/ActivityExtension/v2",
        "xmlns:ns2": "http://www.garmin.com/xmlschemas/UserProfile/v2",
        xmlns: "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      },
      Activities: {
        Activity: {
          _attrs: {
            Sport: "Biking",
          },
          Id: "2020-05-25T17:54:59Z",
          Lap: {
            _attrs: {
              StartTime: "2020-05-16T17:54:59Z",
            },
            TotalTimeSeconds: "2000",
            DistanceMeters: "5000",
            MaximumSpeed: 25,
            Calories: 45,
            AverageHeartRateBpm: {
              Value: 141,
            },
            MaximumHeartRateBpm: {
              Value: 158,
            },
            Intensity: "Active",
            TriggerMethod: "Manual",
            Track: Track,
          },
        },
      },
    },
  };

  return obj;
}
export default App;
