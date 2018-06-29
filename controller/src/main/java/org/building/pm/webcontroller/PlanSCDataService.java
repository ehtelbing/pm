package org.building.pm.webcontroller;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public interface PlanSCDataService {


    public String PlanSCDataSet(@WebParam(name = "V_V_CKCODE") String V_V_CKCODE,
                                @WebParam(name = "V_V_CKNAME") String V_V_CKNAME,
                                @WebParam(name = "V_V_ZYQCODE") String V_V_ZYQCODE,
                                @WebParam(name = "V_V_ZYQNAME") String V_V_ZYQNAME,
                                @WebParam(name = "V_V_EQUCODE") String V_V_EQUCODE,
                                @WebParam(name = "V_V_EQUNAME") String V_V_EQUNAME,
                                @WebParam(name = "V_V_PLAN_TIME_B") String V_V_PLAN_TIME_B,
                                @WebParam(name = "V_V_PLAN_TIME_E") String V_V_PLAN_TIME_E,
                                @WebParam(name = "V_V_FACT_TIME_B") String V_V_FACT_TIME_B,
                                @WebParam(name = "V_V_FACT_TIME_E") String V_V_FACT_TIME_E,
                                @WebParam(name = "V_V_REASON") String V_V_REASON,
                                @WebParam(name = "V_V_TYPE") String V_V_TYPE);

}
