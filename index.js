kwargs = {
    "pm25": 24.87,
    "pm10": 36.34,
    "o3": 0,
    "no2": 90.4,
}
effects = {
    "pm25": 0.014,
    "pm10":  0.005,
    "o3": 0.004,
    "no2": 0.01,
}
function risk_evaluation(param,param_effect){
    param_level = param /10
    risk = Math.pow(1+param_effect,param_level)
    return risk
}
function cv_mortality_risks_outdoor(effects,kwargs){
    risk = 1
    for (arg in kwargs) {
        if (arg in effects){
            arg_risk = risk_evaluation(kwargs[arg], effects[arg]) 
            risk *= (1+arg_risk)
        }
    }
    return risk-1 
}
  
