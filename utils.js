//UTIL FUNCS:
const utilFuncs = {
    noTime: (date) => {
      var d = new Date(date);
      d.setHours(0,0,0,0);
      return d;
    }


}

module.exports = utilFuncs;
