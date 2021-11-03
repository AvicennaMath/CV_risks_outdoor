
function getCvsOutdoorRisk(request) {

    let cvs = CVS(request.PM10,request.PM25,request.O3,request.NO2);
    
    function CVS(pm10=0,pm25=0,o3=0,no2=0){

        let kwargs = {
            pm25: pm25,
            pm10: pm10,
            o3:o3, 
            no2:no2
        }
        
        if (pm10 === 0 && pm25 === 0 && o3 === 0 && no2 === 0){
            return '-';
        }

        const effects = {
            "pm25": 0.014,
            "pm10":  0.005,
            "o3": 0.004,
            "no2": 0.01,
        }
        function risk_evaluation(param,param_effect){
            let param_level = param /10
            return Math.pow(1+param_effect,param_level)-1
        }
        
        function cv_mortality_risks_outdoor(effects,kwargs){
            let risk = 1
            for (let arg in kwargs) {
                if (arg in effects){
                    let arg_risk = risk_evaluation(kwargs[arg], effects[arg]) 
                    risk *= (1+arg_risk)
                }
            }
            return Math.round((risk-1)*100)
        }
        let risk = cv_mortality_risks_outdoor(effects,kwargs);
 
      return risk;
    }

      return cvs;
    }
      module.exports = getCvsOutdoorRisk;
