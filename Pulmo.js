function calculatingPulmo(arr){
    var kwargs = {
            pm25: arr[3].PM25,
            pm10: arr[3].PM10,
            o3:arr[3].O3, 
            no2:arr[3].NO2
        }
  
    const effects = {
        "pm25": 0.012,
        "pm10":  0.03,
        "o3": 0.018,
        "no2": 0.07,
    }
    function risk_evaluation(param,param_effect){
        let param_level = param /10
        return Math.pow(1+param_effect,param_level)-1
    }
    
    function pulmo_mortality_risks_outdoor(effects,kwargs){
        let risk = 1
        for (let arg in kwargs) {
            if (arg in effects){
                let arg_risk = risk_evaluation(kwargs[arg], effects[arg]) 
                risk *= (1+arg_risk)
            }
        }
        return Math.round((risk-1)*100)
    }
    let pulmo_mortality = pulmo_mortality_risks_outdoor(effects,kwargs);
    return pulmo_mortality;
}

module.exports = calculatingPulmo;
