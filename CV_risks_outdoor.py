#!/usr/bin/env python
# coding: utf-8

# In[4]:


import math


# In[47]:


effects = {
    "pm25": 0.014,
    "pm10":  0.005,
    "co": 0.002,
    "o3": 0.004,
    "no2": 0.01,
    "so2": 0.001
}


# In[98]:


def risk_evaluation(param: float, param_effect: float) -> float:
    param_level = param /10
    risk = (1 + param_effect)** param_level - 1
    return risk


# In[99]:


def cv_mortality_risks_outdoor(effects: dict, **kwargs) -> float:
    risk = 1
    for arg in kwargs:
        if arg in effects:
            arg_risk = risk_evaluation(kwargs[arg], effects[arg])
            risk *= (1+arg_risk)
    return risk-1


# In[100]:


print(cv_mortality_risks_outdoor(effects, pm25 = 20))


# In[101]:


print (cv_mortality_risks_outdoor(effects, pm25 = 20, pm10 = 20))


# In[102]:


print (cv_mortality_risks_outdoor(effects, pm25 = 20, pm10 = 20, co = 20))


# In[23]:





# In[ ]:




