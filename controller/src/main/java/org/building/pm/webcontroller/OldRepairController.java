package org.building.pm.webcontroller;

import org.building.pm.webservice.OldRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * 备件修旧Controller
 * 调用namm_ak数据库
 * Created by zjh on 2018/2/12.
 */
@Controller
@RequestMapping("/app/pm/oldR")
public class OldRepairController {

    @Autowired
    private OldRepairService oldRepairService;


    /*
    *获取待维修库房列表
    * */
    @RequestMapping(value = "/Query_OldRepair_Room", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> Query_OldRepair_Room(@RequestParam(value = "V_SAP_PLANTCODE") String V_SAP_PLANTCODE,
                                              @RequestParam(value = "V_SAP_DEPARTCODE") String V_SAP_DEPARTCODE) throws Exception {
        Map result = oldRepairService.getJunkWaitMendStoreList(V_SAP_PLANTCODE, V_SAP_DEPARTCODE);
        return result;
    }


    /*
    *获取待修旧件库存
    * */
    @RequestMapping(value = "/Query_OldRepair", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> Query_OldRepair(@RequestParam(value = "V_SAP_PLANTCODE") String V_SAP_PLANTCODE,
                                                    @RequestParam(value = "V_SAP_DEPARTCODE") String V_SAP_DEPARTCODE,
                                               @RequestParam(value = "V_STOREID") String V_STOREID,
                                               @RequestParam(value = "V_MAT_NO") String V_MAT_NO,
                                               @RequestParam(value = "V_MAT_DESC") String V_MAT_DESC) throws Exception {
        Map result = oldRepairService.GETWAITMENDKCTABLE(V_SAP_PLANTCODE, V_SAP_DEPARTCODE,V_STOREID,V_MAT_NO,V_MAT_DESC);
        return result;
    }

}
