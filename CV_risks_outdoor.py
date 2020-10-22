
import math

effects = {
    "pm25": 0.014,
    "pm10":  0.005,
    "co": 0.002,
    "o3": 0.004,
    "no2": 0.01,
    "so2": 0.001
}


def risk_evaluation(param: float, param_effect: float) -> float:
    # calculating the risk for a particular air quality parameter
    param_level = param /10
    # risk increase for param_effect % for each 10 mkg/m3
    risk = (1 + param_effect)** param_level - 1
    return risk

def cv_mortality_risks_outdoor(effects: dict, **kwargs) -> float:
    # summary function
    # product of risks calculated for each parameter
    risk = 1
    for arg in kwargs:
        if arg in effects:
            # risk calculation for each parameter
            arg_risk = risk_evaluation(kwargs[arg], effects[arg]) # parameter, value
            risk *= (1+arg_risk)
    # subtract one to get percentages
    return risk-1

