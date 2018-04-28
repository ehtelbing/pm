package org.building.pm.controller;

import org.building.pm.service.PM_06Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 17-4-23.
 */
@Controller
@RequestMapping("/app/pm/PM_06")
public class PM_06Controller {

    @Autowired
    private PM_06Service pm_06Service;

    //��λ���ƹ���
    @RequestMapping(value = "/PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_BASE_DEPT_VIEW_ROLE(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //���豸����
    @RequestMapping(value = "/PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                       @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);
        System.out.println(data);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        if (pm_06list != null) {
            for (int i = 0; i < pm_06list.size(); i++) {
                pm_06list.get(i).put("leaf", true);
            }
        }

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //���豸����
    @RequestMapping(value = "/pro_get_deptequ_per", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pro_get_deptequ_per(@RequestParam(value = "v_v_personcode") String v_v_personcode,
                                                   @RequestParam(value = "v_v_deptcodenext") String v_v_deptcodenext,
                                                   @RequestParam(value = "v_v_equtypecode") String v_v_equtypecode,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.pro_get_deptequ_per(v_v_personcode, v_v_deptcodenext, v_v_equtypecode);
        System.out.println(data);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        if (pm_06list != null) {
            for (int i = 0; i < pm_06list.size(); i++) {
                pm_06list.get(i).put("leaf", true);
            }
        }

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_GET_DEPTEQU_PER_DROP", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_GET_DEPTEQU_PER_DROP(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                                        @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PRO_GET_DEPTEQU_PER_DROP(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);
        System.out.println(data);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        if (pm_06list != null) {
            for (int i = 0; i < pm_06list.size(); i++) {
                pm_06list.get(i).put("leaf", true);
            }
        }

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //��ѯ����
    @RequestMapping(value = "/PM_06_DJ_CRITERION_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map PM_06_DJ_CRITERION_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                      @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                      @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                      @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                      @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                      @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
                                      @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_SEL(V_V_ORGCODE, V_V_DEPTCODE,V_V_CK_EQUTYPECODE,V_V_EQUTYPE,V_V_EQUCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    //����豸�������
    @RequestMapping(value = "/PM_06_EQUTYPE_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_EQUTYPE_SEL(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_EQUTYPE_SEL();

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //���������������
    @RequestMapping(value = "/PRO_PM_BASEDIC_VIEW", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PRO_PM_BASEDIC_VIEW(@RequestParam(value = "IS_V_BASETYPE") String IS_V_BASETYPE,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PRO_PM_BASEDIC_VIEW(IS_V_BASETYPE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //��ʼ������
    @RequestMapping(value = "/PM_06_DJ_CRITERION_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_GET(
            @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_GET(V_V_CRITERION_CODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //�������׼��
    @RequestMapping(value = "/PM_06_DJ_CRITERION_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_SET(  @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                                        @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                                        @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
                                                        @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                                        @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                                        @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                        @RequestParam(value = "V_V_CRITERION_ITEM") String V_V_CRITERION_ITEM,
                                                        @RequestParam(value = "V_V_CRITERION_CONTENT") String V_V_CRITERION_CONTENT,
                                                        @RequestParam(value = "V_V_CRITERION_CR") String V_V_CRITERION_CR,
                                                        @RequestParam(value = "V_V_CRITERION_CYCLE") String V_V_CRITERION_CYCLE,
                                                        @RequestParam(value = "V_V_CRITERION_CYCLETYPE") String V_V_CRITERION_CYCLETYPE,
                                                        @RequestParam(value = "V_V_EQU_STATE1") String V_V_EQU_STATE1,
                                                        @RequestParam(value = "V_V_EQU_STATE2") String V_V_EQU_STATE2,
                                                        @RequestParam(value = "V_V_CK_FUNCTION1") String V_V_CK_FUNCTION1,
                                                        @RequestParam(value = "V_V_CK_FUNCTION2") String V_V_CK_FUNCTION2,
                                                        @RequestParam(value = "V_V_CK_FUNCTION3") String V_V_CK_FUNCTION3,
                                                        @RequestParam(value = "V_V_CK_FUNCTION4") String V_V_CK_FUNCTION4,
                                                        @RequestParam(value = "V_V_CK_FUNCTION5") String V_V_CK_FUNCTION5,
                                                        @RequestParam(value = "V_V_CK_FUNCTION6") String V_V_CK_FUNCTION6,
                                                        @RequestParam(value = "V_V_CK_FUNCTION7") String V_V_CK_FUNCTION7,
                                                        @RequestParam(value = "V_V_CK_FUNCTION8") String V_V_CK_FUNCTION8,
                                                        @RequestParam(value = "V_I_ORDER") String V_I_ORDER,
                                                        @RequestParam(value = "V_I_FLAG") String V_I_FLAG,
                                                        @RequestParam(value = "V_V_CKTYPE") String V_V_CKTYPE,
                                                        @RequestParam(value = "V_I_WEIGHT") String V_I_WEIGHT,
                                                        @RequestParam(value = "V_I_YJ") String V_I_YJ,
                                                        @RequestParam(value = "V_V_INPER") String V_V_INPER,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_SET(V_V_ORGCODE,V_V_DEPTCODE,V_V_CK_EQUTYPECODE,V_V_EQUTYPE,V_V_EQUCODE,V_V_CRITERION_CODE,
                V_V_CRITERION_ITEM, V_V_CRITERION_CONTENT, V_V_CRITERION_CR, V_V_CRITERION_CYCLE, V_V_CRITERION_CYCLETYPE, V_V_EQU_STATE1,V_V_EQU_STATE2,V_V_CK_FUNCTION1,
                V_V_CK_FUNCTION2, V_V_CK_FUNCTION3, V_V_CK_FUNCTION4, V_V_CK_FUNCTION5, V_V_CK_FUNCTION6, V_V_CK_FUNCTION7, V_V_CK_FUNCTION8, V_I_ORDER, V_I_FLAG,
                V_V_CKTYPE, V_I_WEIGHT, V_I_YJ, V_V_INPER);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }


    //�������׼��
    @RequestMapping(value = "/PM_06_DJ_CRITERION_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DEL(@RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_DEL(V_V_CRITERION_CODE);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //�ճ���λ�����ҵ��ѯ
    @RequestMapping(value = "/PM_06_DJ_DATA_CREATE", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_CREATE(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_CKTYPE") String V_V_CKTYPE,
            @RequestParam(value = "V_I_WEIGHT") String V_I_WEIGHT,
            @RequestParam(value = "V_I_YJ") String V_I_YJ,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_DATA_CREATE(V_V_IP, V_V_PERCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_CKTYPE, V_I_WEIGHT, V_I_YJ);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //�ճ���λ�����ҵ����ʷѯ
    @RequestMapping(value = "/PM_06_DJ_DATA_HISTORY", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_HISTORY(
            @RequestParam(value = "V_V_IP") String V_V_IP,
            @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_CKTYPE") String V_V_CKTYPE,
            @RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
            @RequestParam(value = "V_I_FLAG") String V_I_FLAG,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_DATA_HISTORY(V_V_IP, V_V_PERCODE, V_V_DEPTCODE, V_V_EQUTYPECODE, V_V_EQUCODE, V_V_CKTYPE, V_V_CRITERION_CODE, V_I_FLAG);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    //�������׼��
    @RequestMapping(value = "/PM_06_DJ_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                                 @RequestParam(value = "V_V_DJ_STATE") String V_V_DJ_STATE,
                                                 @RequestParam(value = "V_V_DJ_DATE") String V_V_DJ_DATE,
                                                 @RequestParam(value = "V_V_DJ_PER") String V_V_DJ_PER,
                                                 @RequestParam(value = "V_V_DJ_NR") String V_V_DJ_NR,
                                                 @RequestParam(value = "V_V_DJ_TYPE") String V_V_DJ_TYPE,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_DATA_SET(V_V_GUID, V_V_DJ_STATE, V_V_DJ_DATE, V_V_DJ_PER, V_V_DJ_NR,V_V_DJ_TYPE);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_DATA_SET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DATA_SET(@RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                           @RequestParam(value = "V_V_FZ_PER") String V_V_FZ_PER,
                                                           @RequestParam(value = "V_V_PLAN_STATE") String V_V_PLAN_STATE,
                                                           @RequestParam(value = "V_V_PLAN_TIME") String V_V_PLAN_TIME,
                                                           @RequestParam(value = "V_V_PLAN_PER") String V_V_PLAN_PER,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_DATA_SET(V_V_CRITERION_CODE,V_V_FZ_PER,V_V_PLAN_STATE,V_V_PLAN_TIME,
                V_V_PLAN_PER);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DATA_SEL(
            @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
            @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
            @RequestParam(value = "V_V_CK_EQUTYPECODE") String V_V_CK_EQUTYPECODE,
            @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            @RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
            @RequestParam(value = "V_V_PAGE") String V_V_PAGE,
            @RequestParam(value = "V_V_PAGESIZE") String V_V_PAGESIZE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_CK_EQUTYPECODE, V_V_EQUTYPE, V_V_EQUCODE,
                V_V_PERSONCODE, V_V_PAGE, V_V_PAGESIZE);
        return data;
    }

    @RequestMapping(value = "/PM_06_DJ_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SEL(
            @RequestParam(value = "V_V_GUID") String V_V_GUID,
            @RequestParam(value = "V_V_STIME") String V_V_STIME,
            @RequestParam(value = "V_V_ETIME") String V_V_ETIME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_DATA_SEL(V_V_GUID, V_V_STIME, V_V_ETIME);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PRO_SAP_PM_EQU_P_GET", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_DATA_SEL(
            @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PRO_SAP_PM_EQU_P_GET(V_V_EQUCODE);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

    @RequestMapping(value = "/PM_06_DJ_CRITERION_DATA_DEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_DJ_CRITERION_DATA_DEL(@RequestParam(value = "V_V_CRITERION_CODE") String V_V_CRITERION_CODE,
                                                           @RequestParam(value = "V_V_PLAN_STATE") String V_V_PLAN_STATE,
                                                           @RequestParam(value = "V_V_PLAN_TIME") String V_V_PLAN_TIME,
                                                           @RequestParam(value = "V_V_PLAN_PER") String V_V_PLAN_PER,
                                                           HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_DJ_CRITERION_DATA_DEL(V_V_CRITERION_CODE,V_V_PLAN_STATE,V_V_PLAN_TIME,
                V_V_PLAN_PER);

        String pm_06 = (String) data.get("RET");

        result.put("RET", pm_06);
        result.put("success", true);
        return result;
    }

    //精密点检年计划发起查询
    @RequestMapping(value = "/PM_06_JMDJ_YEARPLAN_DATA_SEL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> PM_06_JMDJ_YEARPLAN_DATA_SEL(
            @RequestParam(value = "V_V_YEAR") String V_V_YEAR,
            @RequestParam(value = "V_V_INPERCODE") String V_V_INPERCODE,
            @RequestParam(value = "V_V_INPERNAME") String V_V_INPERNAME,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();

        HashMap data = pm_06Service.PM_06_JMDJ_YEARPLAN_DATA_SEL(V_V_YEAR,V_V_INPERCODE,V_V_INPERNAME);

        List<Map<String, Object>> pm_06list = (List) data.get("list");

        result.put("list", pm_06list);
        result.put("success", true);
        return result;
    }

}
