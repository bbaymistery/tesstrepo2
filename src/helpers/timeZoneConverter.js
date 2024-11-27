export function getDateTimeFromFormat(string, format, options = {}) {
  // done

  let timeZone = options.timeZone || "Europe/London";
  let returnValue = options.returnValue || "timestamp";
  format = format?.split("").map((str, i) => [str, i]);

  if (string) {
    let collect = (key) =>
      format
        ?.filter(([sym]) => sym === key)
        ?.map(([sym, i]) => string[i])
        ?.join("");
    let date = parseInt(collect("d"));
    let month = parseInt(collect("m")) - 1;
    let year = parseInt(collect("y"));
    let hour = Number.isInteger(parseInt(collect("H")))
      ? parseInt(collect("H"))
      : 0;
    let minute = Number.isInteger(parseInt(collect("M")))
      ? parseInt(collect("M"))
      : 0;
    let second = Number.isInteger(parseInt(collect("S")))
      ? parseInt(collect("S"))
      : 0;
    let milisecond = Number.isInteger(parseInt(collect("A")))
      ? parseInt(collect("A"))
      : 0;
    let fixer = (int, size) =>
      `${Array.from(new Array(size - String(parseInt(int)).length))
        .map(() => "0")
        .join("")}${String(parseInt(int))}`;
    if (returnValue === "timestamp") {
      if (options.timeZone) {
        return moment(
          moment
            .tz(
              `${year}-${fixer(month + 1, 2)}-${fixer(date, 2)} ${fixer(
                hour,
                2
              )}:${fixer(minute, 2)}:${fixer(second, 2)}`,
              options.timeZone
            )
            .format()
        )
          .toDate()
          .getTime();
      } else {
        let timestamp = Date.UTC(
          ...[year, month, date, hour, minute, second, milisecond]
        );
        if (Number.isInteger(timestamp)) {
          return timestamp;
        } else {
          if (options.checkPoint === true) {
            return timestamp;
          } else {
            throw new Error(
              `incorrect arguments for getDateTimeFromFormat->timestamp function`
            );
          }
        }
      }
    } else if (returnValue === "details") {
      if (
        isArrayOfIntegers([year, month, date, hour, minute, second, milisecond])
      ) {
        if (options.timeZone) {
          return moment(
            moment
              .tz(
                `${year}-${fixer(month + 1, 2)}-${fixer(date, 2)} ${fixer(
                  hour,
                  2
                )}:${fixer(minute, 2)}:${fixer(second, 2)}`,
                options.timeZone
              )
              .format()
          )
            .tz("Etc/UTC")
            .format("YYYY,MM,DD,HH,mm,ss")
            .split(",")
            .map((str, i) => parseInt(str) - parseInt(i === 1 ? 1 : 0));
        } else {
          return [year, month, date, hour, minute, second, milisecond];
        }
      } else {
        if (options.checkPoint === true) {
          return [];
        } else {
          throw new Error(
            `incorrect arguments for getDateTimeFromFormat->details funtion`
          );
        }
      }
    } else if (returnValue === "format") {
      if (
        isArrayOfIntegers([
          year,
          month,
          date,
          hour,
          minute,
          second,
          milisecond,
        ]) &&
        isString(options.generatedFormat)
      ) {
        return options.generatedFormat
          .split("")
          .map((str, i) => {
            switch (str) {
              case "y":
                return fixer(year, 4);
              case "m":
                return fixer(month + 1, 2);
              case "d":
                return fixer(date, 2);
              case "H":
                return fixer(hour, 2);
              case "M":
                return fixer(minute, 2);
              case "S":
                return fixer(second, 2);
              case "A":
                return fixer(milisecond, 3);
              default:
                return str;
            }
          })
          .join("");
      } else {
        throw new Error(
          `incorrect arguments for getDateTimeFromFormat->format funtion`
        );
      }
    } else {
      throw new Error(`incorrect arguments for getDateTimeFromFormat function`);
    }
  }
}
//getDateTimeFromFormat('2022-06-12 05:55','yyyy-mm-dd HH:MM','Europe/London')
