

## CSV to TCX Converter



This is a JavaScript project that allows you to convert a CSV file to a TCX file. The CSV file should contain information about a physical activity such as walking, running, or cycling. The resulting TCX file can be imported into fitness tracking apps or devices.

**Installation**

To use this converter, clone the repository to your local machine and install the dependencies using npm:

To convert a CSV file to a TCX file, run the following command in your terminal:

Replace input.csv in the input folder, after running node index.js the resulting tcx will be placed in the "output" folder.

The converter will read the CSV file and generate a TCX file that includes the following data:

Total time of the activity
Distance covered
Maximum speed
Calories burned
Average and maximum heart rate
Intensity of the activity
Trackpoints with time, position, altitude, distance, heart rate, cadence, speed, watts, assist ratio, range, battery percentage, and calories

**CSV Format**

The CSV file should be formatted with the following columns:

Time	LatitudeDegrees	LongitudeDegrees	AltitudeMeters	Speed	Cadence	Watts	AssistRatio	Range	BatteryPercentage	HeartRateBpm	Calories	DistanceMeters

The time column should be in 24-hour format and the latitude and longitude columns should be decimal degrees.

**TCX Format**

The output TCX file will be in XML format and adhere to the TCX schema. It will include one activity with the trackpoints from the CSV file.

**Contributing**

Contributions are welcome! Please open an issue or pull request if you have any suggestions or bug fixes.

**License**

This project is licensed under the MIT License - see the LICENSE.md file for details.
