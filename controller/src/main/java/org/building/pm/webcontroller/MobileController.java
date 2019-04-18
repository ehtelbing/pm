package org.building.pm.webcontroller;

import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import org.activiti.engine.TaskService;
import org.activiti.engine.identity.User;
import org.building.pm.controller.CjyController;
import org.building.pm.service.CjyService;
import org.building.pm.service.CxyService;
import org.building.pm.service.HpService;
import org.building.pm.service.ZdhService;
import org.building.pm.webpublic.*;
import org.building.pm.webservice.MobileService;
import org.codehaus.xfire.client.Client;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zjh on 2017/2/27.
 */

@Controller
@RequestMapping("/app/pm/mobile")
public class MobileController {
    @Autowired
    private MobileService mobileService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private CjyService cjyService;

    @Autowired
    private CxyService cxyService;

    @Autowired
    private HpService hpService;

    @Autowired
    private ZdhService zdhService;
    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private IdentityService identityService;


    /*
     * mes移动端--登录
     * */
    @RequestMapping(value = "mobile_login", method = RequestMethod.GET)
    @ResponseBody
    public void login(@RequestParam(value = "UserName") String UserName,
                      @RequestParam(value = "PassWord") String PassWord,
                      @RequestParam(value = "UserIp") String UserIp,//地址
                      @RequestParam(value = "OSNAME") String OSNAME,   //操作系统
                      @RequestParam(value = "BROWN") String BROWN,   //浏览器
                      @RequestParam(value = "LOCALHOST") String LOCALHOST,   //主机名
                      @RequestParam(value = "SS") String SS,   //分辨率
                      HttpServletRequest request,
                      HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {
        Map<String, Object> result = mobileService.mobile_login(UserName, PassWord, UserIp, OSNAME, BROWN, LOCALHOST, SS, "移动端");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }

    /*
     * 查询当前登录人代办数量
     * */

    @RequestMapping(value = "MobileTaskSum", method = RequestMethod.GET)
    @ResponseBody
    public void MobileTaskSum(@RequestParam(value = "PersonCode") String PersonCode,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map result = new HashMap();

        try {
            int total = 0;

            if (PersonCode.equals("ActivitiManage")) {
                total = (int) taskService.createTaskQuery().count();
            } else {
                total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).count();
            }

            result.put("total", total);
            result.put("msg", "Ok");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("msg", "Error");
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }


    /*
     * 当前登录人未处理缺陷数
     * */

    @RequestMapping(value = "MobileDefectNoSum", method = RequestMethod.GET)
    @ResponseBody
    public void MobileDefectNoSum(@RequestParam(value = "V_V_STATECODE") String V_V_STATECODE,
                                  @RequestParam(value = "X_PERSONCODE") String X_PERSONCODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        Map<String, Object> result = cjyService.PRO_PM_07_DEFECT_VIEW_NOPAGE(V_V_STATECODE, X_PERSONCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }

    /*
     * 创建抢修快捷工单
     * */
    @RequestMapping(value = "MobileFaultWorkorder", method = RequestMethod.GET)
    @ResponseBody
    public void MobileFaultWorkorder(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                     @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                     @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                     HttpServletRequest request,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        Map<String, Object> result = cxyService.PRO_PM_WORKORDER_SBGZ_CREATE(V_V_PERCODE, V_V_PERNAME, V_V_GUID);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }

    /*检修单位*/
    @RequestMapping(value = "RepairDeptSel", method = RequestMethod.GET)
    @ResponseBody
    public void RepairDeptSel(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws SQLException, IOException {
        Map<String, Object> result = zdhService.fixdept_sel(V_V_DEPTCODE);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }


    /*厂矿/作业区查询*/
    @RequestMapping(value = "PRO_BASE_DEPT_VIEW_ROLE", method = RequestMethod.GET)
    @ResponseBody
    public void mobile_EquSel(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                              @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                              @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                              @RequestParam(value = "V_V_DEPTTYPE") String V_V_DEPTTYPE,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> result = mobileService.PRO_BASE_DEPT_VIEW_ROLE(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_DEPTTYPE);


        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }

    /*
     * 获取下一步审批人
     * */

    @RequestMapping(value = "MobileFlowNextPer", method = RequestMethod.GET)
    @ResponseBody
    public void MobileFlowNextPer(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                  @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                  @RequestParam(value = "V_V_REPAIRCODE") String V_V_REPAIRCODE,
                                  @RequestParam(value = "V_V_FLOWTYPE") String V_V_FLOWTYPE,
                                  @RequestParam(value = "V_V_FLOW_STEP") String V_V_FLOW_STEP,
                                  @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                  @RequestParam(value = "V_V_SPECIALTY") String V_V_SPECIALTY,
                                  @RequestParam(value = "V_V_WHERE") String V_V_WHERE,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        Map<String, Object> result = hpService.PM_ACTIVITI_PROCESS_PER_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_REPAIRCODE, V_V_FLOWTYPE, V_V_FLOW_STEP, V_V_PERCODE, V_V_SPECIALTY, V_V_WHERE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }

    /*
    update 2019/04/17
    */
    /*事故独立工单下达*/
    @RequestMapping(value = "MobileFSaveWork", method = RequestMethod.GET)
    @ResponseBody
    public void MobileFSaveWork(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                @RequestParam(value = "V_V_PERNAME") String V_V_PERNAME,
                                @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                @RequestParam(value = "V_V_WORKORDER_TYPE") String V_V_WORKORDER_TYPE,
                                @RequestParam(value = "V_V_ORDERGUID") String V_V_ORDERGUID,
                                @RequestParam(value = "V_V_SHORT_TXT") String V_V_SHORT_TXT,
                                @RequestParam(value = "V_V_DEPTCODEREPAIR") String V_V_DEPTCODEREPAIR,
                                @RequestParam(value = "V_D_START_DATE") String V_D_START_DATE,
                                @RequestParam(value = "V_D_FINISH_DATE") String V_D_FINISH_DATE,
                                @RequestParam(value = "V_V_WBS") String V_V_WBS,
                                @RequestParam(value = "V_V_WBS_TXT") String V_V_WBS_TXT,
                                HttpServletRequest request,
                                HttpServletResponse resp) throws NoSuchAlgorithmException, SQLException, IOException {
        Map data = cxyService.PRO_PM_WORKORDER_F_SAVE(V_V_PERCODE, V_V_PERNAME, V_V_EQUCODE, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_WORKORDER_TYPE, V_V_ORDERGUID, V_V_SHORT_TXT, V_V_DEPTCODEREPAIR, V_D_START_DATE, V_D_FINISH_DATE, V_V_WBS, V_V_WBS_TXT);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JSONArray json = JSONArray.fromObject(data);
        out.print(json.toString());
        out.close();
    }

    /*事故独立工单待办查询*/
    @RequestMapping(value = "MobileFSelectWork", method = RequestMethod.GET)
    @ResponseBody
    public void MobileFSelectWork(@RequestParam(value = "PersonCode") String PersonCode,
//                                  @RequestParam(value = "FlowType") String FlowType,
                                  @RequestParam(value = "FlowCode") String FlowCode,
                                  @RequestParam(value = "ZyType") String ZyType,
                                  @RequestParam(value = "Page") String Page,
                                  @RequestParam(value = "PageSize") String PageSize,
                                  HttpServletRequest request,
                                  HttpServletResponse resp) throws NoSuchAlgorithmException, SQLException, IOException {
        Map result = new HashMap();
        List resultlist = new ArrayList();
        String FlowType = "Fault";
        int total = 0;
        int start = (Integer.valueOf(Page) - 1) * Integer.valueOf(PageSize);
        int limit = Integer.valueOf(PageSize);
        List<Task> taskList = null;
        if (FlowCode.equals("")) {
            if (PersonCode.equals("ActivitiManage")) {
                if (ZyType.equals("%") || ZyType.equals("")) {
                    taskList = taskService.createTaskQuery().processVariableValueLike("flow_type", FlowType + "%").orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().processVariableValueLike("flow_type", FlowType + "%").count();
                } else {
                    taskList = taskService.createTaskQuery().processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).count();
                }
            } else {
                if (ZyType.equals("%") || ZyType.equals("")) {
                    taskList = taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", FlowType + "%").orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", FlowType + "%").count();
                } else {
                    taskList = taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).count();
                }

            }
        } else {
            if (PersonCode.equals("ActivitiManage")) {
                if (ZyType.equals("%") || ZyType.equals("")) {
                    taskList = taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").count();
                } else {
                    taskList = taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).count();
                }

            } else {
                if (ZyType.equals("%") || ZyType.equals("")) {
                    taskList = taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").count();
                } else {
                    taskList = taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).orderByTaskCreateTime().desc().listPage(start, limit);
                    total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", FlowType + "%").processVariableValueLike("zyName", ZyType).count();
                }

            }
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (Task task : taskList) {
            Map taskmap = new HashMap();
            taskmap.put("Id", task.getId());
            taskmap.put("Name", task.getName());
            taskmap.put("ExecutionId", task.getExecutionId());
            taskmap.put("Description", task.getDescription());
            taskmap.put("ProcessInstanceId", task.getProcessInstanceId());
            taskmap.put("ProcessDefinitionId", task.getProcessDefinitionId());
            taskmap.put("Assignee", task.getAssignee());
            taskmap.put("CreateTime", dateFormat.format(task.getCreateTime()));
            taskmap.put("TaskDefinitionKey", task.getTaskDefinitionKey());

            // BusinessKey
            ProcessInstance instance = runtimeService
                    .createProcessInstanceQuery()
                    .processInstanceId(task.getProcessInstanceId())
                    .singleResult();

            taskmap.put("BusinessKey", instance.getBusinessKey());
            taskmap.put("ProcessDefinitionName", instance.getProcessDefinitionName());
            taskmap.put("ProcessDefinitionKey", instance.getProcessDefinitionKey());


            // ProcessVariables
            List<HistoricVariableInstance> vars = historyService
                    .createHistoricVariableInstanceQuery()
                    .processInstanceId(instance.getId()).list();
            for (HistoricVariableInstance var : vars) {
                taskmap.put(var.getVariableName(), var.getValue());
            }

            if (taskmap.get("flow_type").toString().indexOf("Fault") != -1) {
//                    equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey").toString()).get("list");
                List<Map> equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                if (equIp_name.size() > 0) {
                    Map equmap = (Map) equIp_name.get(0);
                    taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                    taskmap.put("PLANSTART", equmap.get("V_FINDTIME").toString());
                    taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                    taskmap.put("PLANHOUR", equmap.get("V_TIME").toString());
                    taskmap.put("OPERANAME", equmap.get("V_FZR").toString());
                    taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                    taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                }
            }

            User user = identityService.createUserQuery().userId(taskmap.get("originator").toString()).singleResult();

            if (user != null)
                taskmap.put("startName", user.getFirstName());
            else {
                taskmap.put("startName", "未知");
            }
            resultlist.add(taskmap);
        }
        result.put("list", resultlist);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        JSONArray json = JSONArray.fromObject(result);
        out.print(json.toString());
        out.close();
    }
    /*
    update end 2019/04/17
    */

    /*
     * mes移动端菜单
     **/
    @RequestMapping(value = "mobile_menu", method = RequestMethod.GET)
    @ResponseBody
    public void login(@RequestParam(value = "IS_V_ROLECODE") String IS_V_ROLECODE,
                      @RequestParam(value = "IS_V_SYSTYPE") String IS_V_SYSTYPE,
                      @RequestParam(value = "IS_V_MENUCODE_UP") String IS_V_MENUCODE_UP,
                      @RequestParam(value = "DEPTCODE") String DEPTCODE,
                      HttpServletRequest request,
                      HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {

        Map<String, Object> item = mobileService.mobile_menu(IS_V_ROLECODE, IS_V_SYSTYPE, IS_V_MENUCODE_UP, DEPTCODE);


        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*工单状态查询*/
    @RequestMapping(value = "mobile_gsType", method = RequestMethod.GET)
    @ResponseBody
    public void mobile_EquSel(@RequestParam(value = "PlantCode") String PlantCode,
                              @RequestParam(value = "DeptCode") String DeptCode,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.mobile_EquSel(PlantCode, DeptCode);


        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*设备类型查询*/
    @RequestMapping(value = "PRO_GET_DEPTEQUTYPE_PER", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_GET_DEPTEQUTYPE_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                        @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                        HttpServletRequest request,
                                        HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_GET_DEPTEQUTYPE_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备名称查询*/
    @RequestMapping(value = "PRO_GET_DEPTEQU_PER", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_GET_DEPTEQU_PER(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                    @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                    @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_GET_DEPTEQU_PER(V_V_PERSONCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*子设备名称查询*/
    @RequestMapping(value = "PRO_SAP_EQU_VIEW", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_SAP_EQU_VIEW(@RequestParam(value = "V_V_PERSONCODE") String V_V_PERSONCODE,
                                 @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                 @RequestParam(value = "V_V_DEPTCODENEXT") String V_V_DEPTCODENEXT,
                                 @RequestParam(value = "V_V_EQUTYPECODE") String V_V_EQUTYPECODE,
                                 @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                 HttpServletRequest request,
                                 HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_SAP_EQU_VIEW(V_V_PERSONCODE, V_V_DEPTCODE, V_V_DEPTCODENEXT, V_V_EQUTYPECODE, V_V_EQUCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*故障类型查询*/
    @RequestMapping(value = "PM_14_FAULT_TYPE_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_TYPE_ITEM_SEL(
            HttpServletRequest request,
            HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_TYPE_ITEM_SEL();

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组查询*/
    @RequestMapping(value = "PRO_CLASS_M_QUERY", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_CLASS_M_QUERY(@RequestParam(value = "IN_DEPARTCODE") String IN_DEPARTCODE,
                                  @RequestParam(value = "IN_CLASSNAME") String IN_CLASSNAME,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_CLASS_M_QUERY(IN_DEPARTCODE, IN_CLASSNAME);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员查询*/
    @RequestMapping(value = "PRO_CLASS_M_QUERY_P", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_CLASS_M_QUERY_P(@RequestParam(value = "IN_CLASSCODE") String IN_CLASSCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_CLASS_M_QUERY_P(IN_CLASSCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员保存*/
    @RequestMapping(value = "PM_14_FAULT_PER_CLASS_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_PER_CLASS_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_CLASSCODE") String V_V_CLASSCODE,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_PER_CLASS_SET(V_V_GUID, V_V_CLASSCODE, V_V_PERCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*班组人员发送*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SEND", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SEND(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                           @RequestParam(value = "V_V_IP") String V_V_IP,
                                           @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_DATA_SEND(V_V_PERCODE, V_V_IP, V_V_GUID);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*机具查询*/
    @RequestMapping(value = "PRO_PM_19_CARDE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_PM_19_CARDE_SEL(@RequestParam(value = "PRO_PM_19_CARDE_SEL") String IN_CLASSCODE,
                                    HttpServletRequest request,
                                    HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_PM_19_CARDE_SEL(IN_CLASSCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*机具选择*/
    @RequestMapping(value = "PM_14_FAULT_JJ_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_JJ_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                   @RequestParam(value = "V_V_CARCODE") String V_V_CARCODE,
                                   HttpServletRequest request,
                                   HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_JJ_SET(V_V_GUID, V_V_CARCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料查询*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_SPARE_ITEM_SEL(V_V_GUID, V_V_SPAREPART_CODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料删除*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_DEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_SPARE_ITEM_DEL(V_V_GUID, V_V_SPAREPART_CODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*物料保存*/
    @RequestMapping(value = "PM_14_FAULT_SPARE_ITEM_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_SPARE_ITEM_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                           @RequestParam(value = "V_V_SPAREPART_CODE") String V_V_SPAREPART_CODE,
                                           @RequestParam(value = "V_V_SPAREPART_NAME") String V_V_SPAREPART_NAME,
                                           @RequestParam(value = "V_V_TYPE") String V_V_TYPE,
                                           @RequestParam(value = "V_V_UNIT") String V_V_UNIT,
                                           @RequestParam(value = "V_V_PRICE") String V_V_PRICE,
                                           @RequestParam(value = "V_V_NUMBER") String V_V_NUMBER,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_SPARE_ITEM_SET(V_V_GUID, V_V_SPAREPART_CODE, V_V_SPAREPART_NAME,
                V_V_TYPE, V_V_UNIT, V_V_PRICE, V_V_NUMBER);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
     * 故障字典查询
     * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                     @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                     @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                     @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                     @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                     @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                     @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                     HttpServletRequest request,
                                     HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
     * 故障字典查詢唯一数据
     * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_SELBYGUID", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_SELBYGUID(@RequestParam(value = "V_V_GUID") String V_V_ORGCODE,
                                           HttpServletRequest request,
                                           HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {
        UUID uuid = UUID.randomUUID();

        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_SELBYGUID(V_V_ORGCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*
     * 故障数据查询
     * */
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_GET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_GET(@RequestParam(value = "V_V_GUID") String V_V_ORGCODE,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_DATA_GET(V_V_ORGCODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备故障查询*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SEL(@RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                          @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                          @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                          @RequestParam(value = "V_V_FINDTIME_B") String V_V_FINDTIME_B,
                                          @RequestParam(value = "V_V_FINDTIME_E") String V_V_FINDTIME_E,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_DATA_SEL(V_V_ORGCODE, V_V_DEPTCODE, V_V_EQUTYPE,
                V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME_B, V_V_FINDTIME_E);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }


    /*设备故障保存*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_SET", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_SET(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          @RequestParam(value = "V_V_ORGCODE") String V_V_ORGCODE,
                                          @RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE,
                                          @RequestParam(value = "V_V_EQUTYPE") String V_V_EQUTYPE,
                                          @RequestParam(value = "V_V_EQUCODE") String V_V_EQUCODE,
                                          @RequestParam(value = "V_V_EQUCHILD_CODE") String V_V_EQUCHILD_CODE,
                                          @RequestParam(value = "V_V_FAULT_GUID") String V_V_FAULT_GUID,
                                          @RequestParam(value = "V_V_FAULT_TYPE") String V_V_FAULT_TYPE,
                                          @RequestParam(value = "V_V_FAULT_YY") String V_V_FAULT_YY,
                                          @RequestParam(value = "V_V_FINDTIME") String V_V_FINDTIME,
                                          @RequestParam(value = "V_V_FAULT_XX") String V_V_FAULT_XX,
                                          @RequestParam(value = "V_V_JJBF") String V_V_JJBF,
                                          @RequestParam(value = "V_V_FAULT_LEVEL") String V_V_FAULT_LEVEL,
                                          @RequestParam(value = "V_V_FILE_GUID") String V_V_FILE_GUID,
                                          @RequestParam(value = "V_V_INTIME") String V_V_INTIME,
                                          @RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          @RequestParam(value = "V_V_IP") String V_V_IP,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        if (V_V_FAULT_YY.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_FAULT_XX.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_JJBF.equals("null")) {
            V_V_FAULT_YY = "";
        }

        if (V_V_FAULT_LEVEL.equals("null")) {
            V_V_FAULT_YY = "";
        }

        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_DATA_SET(V_V_GUID, V_V_ORGCODE, V_V_DEPTCODE,
                V_V_EQUTYPE, V_V_EQUCODE, V_V_EQUCHILD_CODE, V_V_FAULT_GUID, V_V_FAULT_TYPE, V_V_FAULT_YY, V_V_FINDTIME, V_V_FAULT_XX,
                V_V_JJBF, V_V_FAULT_LEVEL, V_V_FILE_GUID, V_V_INTIME, V_V_PERCODE, V_V_IP);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*设备故障删除*/
    @RequestMapping(value = "PM_14_FAULT_ITEM_DATA_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PM_14_FAULT_ITEM_DATA_DEL(@RequestParam(value = "V_V_PERCODE") String V_V_PERCODE,
                                          @RequestParam(value = "V_V_IP") String V_V_IP,
                                          @RequestParam(value = "V_V_GUID") String V_V_GUID,
                                          HttpServletRequest request,
                                          HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PM_14_FAULT_ITEM_DATA_DEL(V_V_PERCODE, V_V_IP, V_V_GUID);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件查询*/
    @RequestMapping(value = "PRO_BASE_FILE_SEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_BASE_FILE_SEL(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                                  @RequestParam(value = "V_V_FILETYPECODE") String V_V_FILETYPECODE,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_BASE_FILE_SEL(V_V_GUID, V_V_FILETYPECODE);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件删除*/
    @RequestMapping(value = "PRO_BASE_FILE_DEL", method = RequestMethod.GET)
    @ResponseBody
    public void PRO_BASE_FILE_DEL(@RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                                  HttpServletRequest request,
                                  HttpServletResponse response)
            throws NoSuchAlgorithmException, SQLException, IOException {


        Map<String, Object> item = mobileService.PRO_BASE_FILE_DEL(V_V_FILEGUID);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件上传*/
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void uploadFile(@RequestParam(value = "file") CommonsMultipartFile file,
                           HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();

        String V_V_FILETYPECODE = request.getParameter("FileType").toString();// 上传类型
        String V_V_GUID = request.getParameter("GUID").toString();// guid
        String V_V_PLANT = request.getParameter("UpLoadOrg").toString();// 上传人单位
        String V_V_DEPT = request.getParameter("UpLoadDept").toString();// 上传人作业区
        String V_V_PERSON = request.getParameter("UpLoadUser").toString();// 上传人
        String Remark = request.getParameter("Remark").toString();

        String V_V_FILENAME = file.getOriginalFilename();

        V_V_FILENAME = new String(V_V_FILENAME.getBytes("iso-8859-1"), "utf-8");

        InputStream inputStream = file.getInputStream();

        List<Map> result = null;

        result = mobileService.PRO_BASE_FILE_ADD(V_V_GUID, V_V_FILENAME, inputStream, V_V_FILETYPECODE, V_V_PLANT, V_V_DEPT, V_V_PERSON, Remark);

        MasageClass masageClass = new MasageClass();
        masageClass.setRet(result.get(0) == null ? "" : result.get(0).get("V_INFO").toString());
        item.add(masageClass);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONArray json = JSONArray.fromObject(item);
        out.print(json.toString());
        out.close();
    }

    /*附件下载*/
    @RequestMapping(value = "/downloadFile", method = RequestMethod.GET, produces = "application/html;charset=UTF-8")
    @ResponseBody
    public void downloadFile(@RequestParam(value = "V_V_GUID") String V_V_GUID,
                             @RequestParam(value = "V_V_FILEGUID") String V_V_FILEGUID,
                             HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<MasageClass> item = new ArrayList<MasageClass>();
        List<Map> result = null;
        result = mobileService.PRO_BASE_FILE_DOWNLOAD(V_V_GUID, V_V_FILEGUID);
        String V_V_FILENAME = result.get(0).get("FileName").toString();
        Blob fileblob = (Blob) result.get(0).get("V_BLOB");
        InputStream is = fileblob.getBinaryStream();
        OutputStream fos = response.getOutputStream();

        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");

        response.setHeader("Content-Disposition", "attachment; filename=" + V_V_FILENAME);

        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) > 0) {
            fos.write(b, 0, length);
        }
        MasageClass masageClass = new MasageClass();
        masageClass.setRet(result.get(0) == null ? "" : result.get(0).get("V_INFO").toString());
        item.add(masageClass);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        fos.flush();
        is.close();
        fos.close();
    }

}
