package org.building.pm.activitiController;


import org.activiti.engine.*;
import org.activiti.engine.history.*;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.HistoricProcessInstanceEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.building.pm.controller.CjyController;
import org.building.pm.service.*;
import org.building.pm.webcontroller.AMToMessController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.building.pm.webpublic.GetShtgtime;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.zip.ZipInputStream;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 * 流程图controller
 */
@Controller
@RequestMapping("/app/pm/Activiti")
public class ActivitiController {

    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private HistoryService historyService;
    @Autowired
    private ManagementService managementService;
    @Autowired
    private IdentityService identityService;

    @Autowired
    private ActivitiService activitiService;

    @Autowired
    private PM_03Service pm_03Service;

    @Autowired
    private HpService hpService;

    @Autowired
    private AMToMessController amToMessController;

    @Autowired
    private BasicService basicService;

    @Autowired
    private GetShtgtime getShtgtime;

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private CxyService cxyService;

    @Autowired
    private Dx_fileService dx_fileService;

    @Autowired
    private CjyController cjyController;
    @Value("#{configProperties['infopub.url']}")
    private String infopuburl;

    @Value("#{configProperties['infopub.username']}")
    private String infopubusername;

    @Value("#{configProperties['infopub.password']}")
    private String infopubpassword;

    @Value("#{configProperties['pmlogin']}")
    private String pmlogin;

    //部署流程
    @RequestMapping(value = "ModelDeployProcess", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> ModelDeployProcess(@RequestParam(value = "processFile") MultipartFile processFile, HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map result = new HashMap();

        String filename = request.getParameter("deployName").toString();// 发布名称

        try {
            InputStream inputStream = processFile.getInputStream();

            ZipInputStream zipInputStream = new ZipInputStream(inputStream);
            repositoryService.createDeployment().name(filename)
                    .addZipInputStream(zipInputStream).deploy();

            result.put("ret", "部署流程成功");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            result.put("ret", "部署流程失败");
        }

        return result;
    }


    //发起流程
    @RequestMapping(value = "StratProcess", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> StratProcess(@RequestParam(value = "V_INPER") String V_INPER,
                                            @RequestParam(value = "V_NEXTPER") String V_NEXTPER,
                                            @RequestParam(value = "V_IDEA") String V_IDEA,
                                            @RequestParam(value = "V_STEPNAME") String V_STEPNAME,
                                            @RequestParam(value = "V_STEPCODE") String V_STEPCODE,
                                            @RequestParam(value = "processKey") String processKey,
                                            @RequestParam(value = "businessKey") String businessKey,
                                            @RequestParam(value = "parName") String[] parName,
                                            @RequestParam(value = "parVal") String[] parVal,
                                            HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map result = new HashMap();
        Map param = new HashMap();

        int num = (int) taskService.createTaskQuery().processVariableValueLike("flow_businesskey", businessKey).count();

        if (num == 0) {
            HashMap data = activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER, V_INPER);

            String ret = (String) data.get("RET");
            result.put("RET", ret);

            Date date = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(date);

            c.add(Calendar.MONTH, 2);
            c.set(Calendar.DAY_OF_MONTH, 0);
            /* int year = c.get(Calendar.YEAR);
            int month = c.get(Calendar.MONTH)+1;
            int date = c.get(Calendar.DATE);
           int hour = c.get(Calendar.HOUR_OF_DAY);
            int minute = c.get(Calendar.MINUTE);
            int second = c.get(Calendar.SECOND);*/
//            String time = c.get(Calendar.YEAR) + "-" + c.get(Calendar.MONTH) + 1 + "-" + c.get(Calendar.DATE) + "T23:59:59";
            String time = getShtgtime.Shtgtime();

            try {
                for (int i = 0; i < parName.length; i++) {
                    param.put(parName[i].toString(), parVal[i].toString());
                }

                param.put("idea", V_IDEA);
                param.put("shtgtime", time);

                ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processKey, businessKey,
                        param);

                String jstcode = basicService.BASE_PRO_JST_CODESEL(V_NEXTPER);

                if (!jstcode.equals("")) {
                    String messtxt = "PM系统待办提醒";
                    String MSG = "<SendMessage><AM_Name>" + jstcode + "</AM_Name><PhoneNum></PhoneNum><UserId></UserId><MessageTxt>" + messtxt + "</MessageTxt><SystemName>PM系统</SystemName><Type>即时通</Type><Access></Access><Email></Email><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2></SendMessage>";
                    String loginurl = pmlogin + "?v_mancode=" + V_NEXTPER + "&v_type=newangel";

                    String strContent = "<HTML><BODY bgColor='#ffffff' style='font-family:Verdana,新宋体;font-size: 12px;'>";
                    strContent += "<HR size='1' style='color: 52658C;'>";
                    strContent += "待办任务提醒：<UL>";
                    strContent += "<li>您有：1 条待办</li>";
                    strContent += "</UL><a href='" + loginurl + "' target='_blank' >请点击这里进行办理</a></BODY></HTML>";


                    try {
                        String sendResult = amToMessController.AMToMess(MSG, strContent, infopuburl, infopubusername, infopubpassword);
                        result.put("sendAm", sendResult);
                    } catch (Exception e) {
                        e.printStackTrace();
                        result.put("sendAm", "Fail");
                    }
                }

                result.put("id", processInstance.getId());
                result.put("InstanceId", processInstance.getProcessInstanceId());
                result.put("BusinessKey", processInstance.getBusinessKey());
                result.put("ProcessId", processInstance.getProcessDefinitionId());
                result.put("ret", "OK");
                result.put("msg", "流程发起成功");
            } catch (Exception e) {
                e.printStackTrace();
                result.put("ret", "ERROR");
                result.put("msg", "流程发起失败");
            }
        } else {
            result.put("ret", "ERROR");
            result.put("msg", "流程发起失败,流程businesskey重复");
        }

        return result;
    }

    //根据时间code查询已办任务
    @RequestMapping(value = "QueryhistoryTaskList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryhistoryTaskList(@RequestParam(value = "PersonCode") String PersonCode,
                                                    @RequestParam(value = "beginTime") String beginTime,
                                                    @RequestParam(value = "endTime") String endTime,
                                                    @RequestParam(value = "start") String start,
                                                    @RequestParam(value = "limit") String limit)
            throws SQLException {


        Map result = new HashMap();
        List resultlist = new ArrayList();

        Map<String, Object> ProcessType = activitiService.QueryProcessType();

        List list = (List) ProcessType.get("list");
        String[] nameSapce = new String[list.size()];
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            nameSapce[i] = map.get("V_FLOWTYPE_CODE").toString();
        }
        try {
            List<HistoricTaskInstance> tasks;
            int total = (int) historyService
                    .createNativeHistoricTaskInstanceQuery()
                    .sql(makeNativeQuerySQLCountHistory(nameSapce, beginTime, endTime))
                    .parameter("assignee", PersonCode).parameter("startTime", beginTime).parameter("endTime", endTime + 1).count();
            tasks = historyService
                    .createNativeHistoricTaskInstanceQuery()
                    .sql(makeNativeQuerySQLResultHistory(nameSapce, beginTime, endTime))
                    .parameter("assignee", PersonCode).parameter("startTime", beginTime).parameter("endTime", endTime + 1).listPage(Integer.valueOf(start), Integer.valueOf(limit));

            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            for (HistoricTaskInstance task : tasks) {
                Map taskmap = new HashMap();
                if (!task.getDeleteReason().equals("deleted")) {

                    taskmap.put("Id", task.getId());
                    taskmap.put("Name", task.getName());
                    taskmap.put("ExecutionId", task.getExecutionId());
                    taskmap.put("Description", task.getDescription());
                    taskmap.put("ProcessInstanceId", task.getProcessInstanceId());
                    taskmap.put("ProcessDefinitionId", task.getProcessDefinitionId());
                    taskmap.put("Assignee", task.getAssignee());
                    //taskmap.put("StartTime", dateFormat.format(task.getStartTime()));
                    if (task.getEndTime() != null) {
                        taskmap.put("endTime", dateFormat.format(task.getEndTime()));
                    } else {
                        taskmap.put("endTime", "");
                    }
                    taskmap.put("TaskDefinitionKey", task.getTaskDefinitionKey());
                    HistoricProcessInstance instance = historyService
                            .createHistoricProcessInstanceQuery()
                            .processInstanceId(task.getProcessInstanceId())
                            .singleResult();
                    if (instance != null) {
                        taskmap.put("BusinessKey", instance.getBusinessKey());
                        taskmap.put("ProcessDefinitionName", instance.getProcessDefinitionName());
                        taskmap.put("ProcessDefinitionKey", instance.getProcessDefinitionKey());
                    }

                    // ProcessVariables
                    List<HistoricVariableInstance> vars = historyService
                            .createHistoricVariableInstanceQuery()
                            .processInstanceId(instance.getId()).list();

                    for (HistoricVariableInstance var : vars) {
                        taskmap.put(var.getVariableName(), var.getValue());
                    }
                    User user = identityService.createUserQuery()
                            .userId(taskmap.get("originator").toString()).singleResult();

                    if (user != null)
                        taskmap.put("startName", user.getFirstName());
                    else {
                        taskmap.put("startName", "未知");
                    }

                    resultlist.add(taskmap);
                }

            }

            result.put("list", resultlist);
            result.put("total", total);
            result.put("count", result.size());
            result.put("msg", "Ok");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("msg", "Error");
        }

        return result;
    }

    public String makeNativeQuerySQLHistory(String select, String[] nameSpace, String startTime, String endTime) {
        String categorySQL = "";
        if (nameSpace != null && nameSpace.length > 0) {
            int i = 1;
            categorySQL += " AND (";
            for (String categoryItem : nameSpace) {
                categorySQL += " P.CATEGORY_ like '" + categoryItem + "%'";
                if (i != nameSpace.length)
                    categorySQL += " OR ";
                i++;
            }
            categorySQL += " ) ";
        }
        String sql = "";
        if (/*this.finished == */true) {
            sql = " select max(id_) as ID_,\n" +
                    "       s.proc_def_id_,\n" +
                    "       s.task_def_key_,\n" +
                    "       s.proc_inst_id_,\n" +
                    "       s.parent_task_id_,\n" +
                    "       s.execution_id_,\n" +
                    "       s.name_,\n" +
                    "       s.description_,\n" +
                    "       s.owner_,\n" +
                    "       s.assignee_,\n" +
                    "       s.delete_reason_,\n" +
                    "       max(end_time_) AS END_TIME_\n" +
                    "  from ( SELECT "
                    + select
                    + " FROM "
                    + managementService
                    .getTableName(HistoricTaskInstance.class)
                    + " RES, "
                    + managementService.getTableName(ProcessDefinition.class)
                    + " P " + "WHERE RES.PROC_DEF_ID_ = P.ID_ "
                    + "AND RES.START_TIME_ >=\n" +
                    "  TO_DATE(" + '\'' + startTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
                    + "AND RES.START_TIME_ <=\n" +
                    "  TO_DATE(" + '\'' + endTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')+1"
                    + "AND RES.END_TIME_ IS NOT NULL "
                    + "AND RES.ASSIGNEE_ =  #{assignee} " + categorySQL
                    + "ORDER BY RES.END_TIME_ DESC ) s\n" +
                    "   group by s.execution_id_ , s.proc_def_id_,s.task_def_key_,s.proc_inst_id_,s.parent_task_id_,s.name_,s.description_,s.owner_,s.assignee_,s.delete_reason_" +
                    "  ORDER BY END_TIME_ DESC";
        } else {
            sql = "  SELECT "
                    + select
                    + " FROM "
                    + managementService
                    .getTableName(HistoricTaskInstance.class)
                    + " RES, "
                    + managementService.getTableName(ProcessDefinition.class)
                    + " P, "
                    + managementService
                    .getTableName(HistoricProcessInstance.class)
                    + " HPI  WHERE RES.PROC_DEF_ID_ = P.ID_ "
                    + "AND RES.PROC_INST_ID_ = HPI.ID_ "
                    + "AND RES.END_TIME_ IS NOT NULL "
                    + "AND HPI.END_TIME_ IS NULL "
                    + "AND RES.ASSIGNEE_ =  #{assignee} " + categorySQL
                    + "ORDER BY RES.END_TIME_ DESC";
        }
        return sql;
    }

    public String makeNativeQuerySQLHistoryCount(String select, String[] nameSpace, String startTime, String endTime) {
        String categorySQL = "";
        if (nameSpace != null && nameSpace.length > 0) {
            int i = 1;
            categorySQL += " AND (";
            for (String categoryItem : nameSpace) {
                categorySQL += " P.CATEGORY_ like '" + categoryItem + "%'";
                if (i != nameSpace.length)
                    categorySQL += " OR ";
                i++;
            }
            categorySQL += " ) ";
        }
        String sql = "";
        if (/*this.finished == */true) {
            sql = "  SELECT "
                    + select
                    + " FROM "
                    + managementService
                    .getTableName(HistoricTaskInstance.class)
                    + " RES, "
                    + managementService.getTableName(ProcessDefinition.class)
                    + " P " + "WHERE RES.PROC_DEF_ID_ = P.ID_ "
                    + "AND RES.START_TIME_ >=\n" +
                    "  TO_DATE(" + '\'' + startTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
                    + "AND RES.START_TIME_ <=\n" +
                    "  TO_DATE(" + '\'' + endTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
                    + "AND RES.END_TIME_ IS NOT NULL "
                    + "AND RES.ASSIGNEE_ =  #{assignee} " + categorySQL
                    + "ORDER BY RES.END_TIME_ DESC ";
        } else {
            sql = "  SELECT "
                    + select
                    + " FROM "
                    + managementService
                    .getTableName(HistoricTaskInstance.class)
                    + " RES, "
                    + managementService.getTableName(ProcessDefinition.class)
                    + " P, "
                    + managementService
                    .getTableName(HistoricProcessInstance.class)
                    + " HPI  WHERE RES.PROC_DEF_ID_ = P.ID_ "
                    + "AND RES.PROC_INST_ID_ = HPI.ID_ "
                    + "AND RES.END_TIME_ IS NOT NULL "
                    + "AND HPI.END_TIME_ IS NULL "
                    + "AND RES.ASSIGNEE_ =  #{assignee} " + categorySQL
                    + "ORDER BY RES.END_TIME_ DESC";
        }
        return sql;
    }


    public String makeNativeQuerySQLCountHistory(String[] nameSpace, String startTime, String endTime) {
        return makeNativeQuerySQLHistoryCount("count(*)", nameSpace, startTime, endTime);
    }

    private String makeNativeQuerySQLResultHistory(String[] nameSpace, String startTime, String endTime) {
        return makeNativeQuerySQLHistory("RES.*", nameSpace, startTime, endTime);
    }

    /*
     * 查询人员代办总数
     * */
    @RequestMapping(value = "QueryTaskListSum", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskListSum(@RequestParam(value = "PersonCode") String PersonCode)
            throws SQLException {
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
        return result;
    }

    /*
     * 查询当前登录人各个流程类型下的代办数量
     * */
    @RequestMapping(value = "QueryTaskTypeNum", method = RequestMethod.POST)
    @ResponseBody
    public Map QueryTaskTypeNum(@RequestParam(value = "PersonCode") String PersonCode,
                                @RequestParam(value = "FlowCode") String FlowCode,
                                @RequestParam(value = "ZyType") String ZyType) throws SQLException {
        Map result = new HashMap();
        List retlist = new ArrayList();
        HashMap retType = activitiService.QueryProcessType();
        List list = (List) retType.get("list");
        for (int i = 0; i < list.size(); i++) {
            Map ret = new HashMap();
            Map map = (Map) list.get(i);
            int total = 0;
            if (FlowCode.equals("")) {
                if (PersonCode.equals("ActivitiManage")) {
                    if (ZyType.equals("%") || ZyType.equals("")) {
                        total = (int) taskService.createTaskQuery().processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").count();
                    } else {
                        total = (int) taskService.createTaskQuery().processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").processVariableValueLike("zyName", ZyType).count();
                    }
                } else {
                    if (ZyType.equals("%") || ZyType.equals("")) {
                        total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").count();
                    } else {
                        total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").processVariableValueLike("zyName", ZyType).count();
                    }
                }

                ret.put("code", map.get("V_FLOWTYPE_CODE").toString());
                ret.put("name", map.get("V_FLOWTYPE_NAME").toString() + "(" + total + ")");
            } else {
                if (PersonCode.equals("ActivitiManage")) {
                    if (ZyType.equals("%") || ZyType.equals("")) {
                        total = (int) taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").count();
                    } else {
                        total = (int) taskService.createTaskQuery().processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").processVariableValueLike("zyName", ZyType).count();
                    }
                } else {
                    if (ZyType.equals("%") || ZyType.equals("")) {
                        total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").count();
                    } else {
                        total = (int) taskService.createTaskQuery().taskAssignee(PersonCode).processVariableValueLike("flow_code", "%" + FlowCode + "%").processVariableValueLike("flow_type", map.get("V_FLOWTYPE_CODE").toString() + "%").processVariableValueLike("zyName", ZyType).count();
                    }

                }
                ret.put("code", map.get("V_FLOWTYPE_CODE").toString());
                ret.put("name", map.get("V_FLOWTYPE_NAME").toString() + "(" + total + ")");
            }

            retlist.add(ret);
        }
        result.put("list", retlist);
        return result;
    }

    /*
     * nameSpace  人员编码查询当前人员代办信息
     * */
    @RequestMapping(value = "QueryTaskList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskList(@RequestParam(value = "PersonCode") String PersonCode,
                                             @RequestParam(value = "FlowType") String FlowType,
                                             @RequestParam(value = "FlowCode") String FlowCode,
                                             @RequestParam(value = "ZyType") String ZyType,
                                             @RequestParam(value = "Page") String Page,
                                             @RequestParam(value = "PageSize") String PageSize)
            throws SQLException {

        Map result = new HashMap();
        List resultlist = new ArrayList();

        int total = 0;
        int start = (Integer.valueOf(Page) - 1) * Integer.valueOf(PageSize);
        int limit = Integer.valueOf(PageSize);
        try {
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

                if (taskmap.get("flow_type").equals("WORK")) {
                    List<Map> MATERIALNAME = (List) activitiService.PRO_WORKORDER_SPARE_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (MATERIALNAME.size() > 0) {
                        Map map = (Map) MATERIALNAME.get(0);
                        taskmap.put("MATERIALNAME", map.get("V_MATERIALNAME").toString());
                    }
                }
                List<Map> equIp_name = (List) workOrderService.PRO_PM_WORKORDER_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
//                List<Map> equIp_name = (List) workOrderService.PRO_PM_WORKORDER_GET(taskmap.get("BusinessKey").toString()).get("list");
                if (equIp_name.size() > 0) {
                    Map equmap = (Map) equIp_name.get(0);
                    taskmap.put("EQUNAME", equmap.get("V_EQUIP_NAME").toString());
                    taskmap.put("PLANSTART", equmap.get("D_START_DATE").toString());
                    taskmap.put("PLANEND", equmap.get("D_FINISH_DATE").toString());
                    taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                    taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                }   //---add 3 columns on NONTH
                else if (taskmap.get("flow_type").toString().indexOf("MonthPlan") != -1) {
                    equIp_name = (List) pm_03Service.PRO_PM_03_PLAN_MONTH_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (equIp_name.size() > 0) {
                        Map equmap = (Map) equIp_name.get(0);
                        taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                        taskmap.put("PLANSTART", equmap.get("V_STARTTIME").toString());
                        taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                        taskmap.put("PLANHOUR", equmap.get("V_HOUR").toString());
                        taskmap.put("OPERANAME", equmap.get("V_OPERANAME").toString());
                        taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                        taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        taskmap.put("ZYNAME", equmap.get("V_REPAIRMAJOR_CODE").toString());

                    }
                }//---add 3 columns on week
                else if (taskmap.get("flow_type").toString().indexOf("WeekPlan") != -1) {
                    equIp_name = (List) pm_03Service.PRO_PM_03_PLAN_WEEK_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (equIp_name.size() > 0) {
                        Map equmap = (Map) equIp_name.get(0);
                        taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                        taskmap.put("PLANSTART", equmap.get("V_STARTTIME").toString());
                        taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                        taskmap.put("PLANHOUR", equmap.get("V_HOUR").toString());
                        taskmap.put("OPERANAME", equmap.get("V_OPERANAME").toString());
                        taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                        taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        taskmap.put("ZYNAME", equmap.get("V_REPAIRMAJOR_CODE").toString());
                    }
                } else if (taskmap.get("flow_type").toString().indexOf("Fault") != -1) {
//                    equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (taskmap.get("flow_type").equals("Fault")) {
                        equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", equmap.get("V_FINDTIME").toString());
                            taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                            taskmap.put("PLANHOUR", equmap.get("V_TIME").toString());
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        }
                    } else {
                        equIp_name = (List) cxyService.PM_FAULT_PLAN_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", "");
                            taskmap.put("PLANEND", "");
                            taskmap.put("PLANHOUR", "");
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        }

                    }
                }
                else if (taskmap.get("flow_type").toString().indexOf("Hitch") != -1) {
//                    equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (taskmap.get("flow_type").equals("Hitch")) {
                        equIp_name = (List) cxyService.PM_BUG_ITEM_DATA_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", equmap.get("V_FINDTIME").toString());
                            taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                            taskmap.put("PLANHOUR", equmap.get("V_TIME").toString());
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        }
                    } else {
                        equIp_name = (List) cxyService.PM_BUG_PLAN_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", "");
                            taskmap.put("PLANEND", "");
                            taskmap.put("PLANHOUR", "");
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        }

                    }
                }
                //yearplan
                else if (taskmap.get("flow_type").toString().indexOf("YearPlan") != -1) {
                    equIp_name = (List) dx_fileService.PM_PLAN_YEAR_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (equIp_name.size() > 0) {
                        Map equmap = (Map) equIp_name.get(0);
                        taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                        taskmap.put("PLANSTART", equmap.get("PLANTJMONTH").toString());
                        taskmap.put("PLANEND", equmap.get("PLANJGMONTH").toString());
                        taskmap.put("PLANHOUR", equmap.get("PLANHOUR").toString());
                        taskmap.put("OPERANAME", equmap.get("SCLBNAME").toString());
                        taskmap.put("ORGNAME", equmap.get("ORGNAME").toString());
                        taskmap.put("DEPTNAME", equmap.get("DEPTCODE").toString());
                        taskmap.put("ZYNAME", equmap.get("ZYNAME").toString());
                    }
                }
                //projectPlan
                else if (taskmap.get("flow_type").toString().indexOf("MaintainPlan") != -1) {
                    equIp_name = (List) dx_fileService.PRO_PM_03_PLAN_PROJECT_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (equIp_name.size() > 0) {
                        Map equmap = (Map) equIp_name.get(0);
                        taskmap.put("EQUNAME", equmap.get("EQUNAME").toString());
                        taskmap.put("PLANSTART", equmap.get("V_BDATE").toString());
                        taskmap.put("PLANEND", equmap.get("V_EDATE").toString());
                        taskmap.put("PLANHOUR", equmap.get("V_SUMTIME").toString());
//                        taskmap.put("OPERANAME", equmap.get("V_INMAN").toString());
                        taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                        taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        taskmap.put("ZYNAME", equmap.get("V_SPECIALTYNAME").toString());
                        taskmap.put("remark", equmap.get("V_QSTEXT").toString());
                    }
                } else if (taskmap.get("flow_type").toString().indexOf("Hitch") != -1) {
//                    equIp_name = (List) cxyService.PRO_FAULT_ITEM_DATA_GET(taskmap.get("BusinessKey").toString()).get("list");
                    if (taskmap.get("flow_type").equals("Hitch")) {
                        equIp_name = (List) cxyService.PM_BUG_ITEM_DATA_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", equmap.get("V_FINDTIME").toString());
                            taskmap.put("PLANEND", equmap.get("V_ENDTIME").toString());
                            taskmap.put("PLANHOUR", equmap.get("V_TIME").toString());
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                            taskmap.put("remark", equmap.get("V_QSTEXT").toString());
                        }
                    } else {
                        equIp_name = (List) cxyService.PM_BUG_PLAN_GET(taskmap.get("BusinessKey") == null ? "" : taskmap.get("BusinessKey").toString()).get("list");
                        if (equIp_name.size() > 0) {
                            Map equmap = (Map) equIp_name.get(0);
                            taskmap.put("EQUNAME", equmap.get("V_EQUNAME").toString());
                            taskmap.put("PLANSTART", "");
                            taskmap.put("PLANEND", "");
                            taskmap.put("PLANHOUR", "");
                            taskmap.put("OPERANAME", "");
                            taskmap.put("ORGNAME", equmap.get("V_ORGNAME").toString());
                            taskmap.put("DEPTNAME", equmap.get("V_DEPTNAME").toString());
                        }

                    }
                }
                User user = identityService.createUserQuery()
                        .userId(taskmap.get("originator").toString()).singleResult();

                if (user != null)
                    taskmap.put("startName", user.getFirstName());
                else {
                    taskmap.put("startName", "未知");
                }
                resultlist.add(taskmap);
            }
            result.put("list", resultlist);
            result.put("total", total);
            result.put("count", result.size());
        } catch (Exception e) {
            e.printStackTrace();
            result.put("msg", "Error");
        }

        return result;
    }

    public String makeNativeQuerySQL(String select, String[] nameSpace) {
        String categorySQL = "";
        if (nameSpace != null && nameSpace.length > 0) {
            int i = 1;
            categorySQL += " AND (";
            for (String categoryItem : nameSpace) {
                categorySQL += " p.CATEGORY_ = '" + categoryItem + "'";
                if (i != nameSpace.length)
                    categorySQL += " OR ";
                i++;
            }
            categorySQL += " ) ";
        }
        String sql = "  SELECT " + select + " FROM "
                + managementService.getTableName(Task.class) + " T, "
                + managementService.getTableName(ProcessDefinition.class)
                + " P " + "WHERE T.PROC_DEF_ID_ = P.ID_ "
                + "AND T.ASSIGNEE_ =  #{assignee} " + categorySQL
                + "ORDER BY T.CREATE_TIME_ DESC";
        return sql;
    }


    //通过业务Id获得流程实例信息
    @RequestMapping(value = "GetInstanceFromBusinessId", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetInstanceFromBusinessId(@RequestParam(value = "businessKey") String businessKey)
            throws SQLException {
        Map result = new HashMap();
        try {
            HistoricProcessInstance instance = historyService
                    .createHistoricProcessInstanceQuery()
                    .processInstanceBusinessKey(businessKey).listPage(0, 1)
                    .get(0);
            result.put("Id", instance.getId());
            result.put("InstanceId", instance.getId());
            result.put("ProcessId", instance.getProcessDefinitionId());
            result.put("BusinessKey", instance.getBusinessKey());

            List<HistoricVariableInstance> vars = historyService
                    .createHistoricVariableInstanceQuery()
                    .processInstanceId(instance.getId()).list();
            Map<String, Object> Variables = instance.getProcessVariables();
            for (HistoricVariableInstance var : vars) {
                result.put(var.getVariableName(), var.getValue());
            }
            if (Variables != null && Variables.size() > 0
                    && Variables.containsKey("INSTANCENAME")
                    && Variables.get("INSTANCENAME") != null)
                result.put("InstanceName", Variables.get("INSTANCENAME").toString());
            else
                result.put("InstanceName", "未设置");
            result.put("StartTime", instance.getStartTime());

            if (Variables != null && Variables.size() > 0
                    && Variables.containsKey("ORIGINATOR")
                    && Variables.get("ORIGINATOR") != null)
                result.put("StartUserId", Variables.get("ORIGINATOR").toString());
            else
                result.put("StartUserId", "");
            result.put("msg", "Ok");
        } catch (Exception e) {
            result.put("msg", "Error");
        }
        return result;
    }


    //通过业务Id获得该流程的最新流程步骤
    @RequestMapping(value = "GetActivitiStepFromBusinessId", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetActivitiStepFromBusinessId(@RequestParam(value = "businessKey") String businessKey)
            throws SQLException {
        Map result = new HashMap();
        try {
            HistoricProcessInstance instance = historyService
                    .createHistoricProcessInstanceQuery()
                    .processInstanceBusinessKey(businessKey).listPage(0, 1)
                    .get(0);
            result.put("InstanceId", instance.getId());
            Map data = InstanceState(instance.getId());
            List<Map<String, Object>> list = (List) data.get("list");
            result.put("list", list.get(list.size() - 1));
            result.put("msg", "Ok");
        } catch (Exception e) {
            result.put("msg", "Error");
        }
        return result;
    }

    //显示流程图
    @RequestMapping(value = "DisplayChart", method = RequestMethod.GET)
    @ResponseBody
    public void DisplayChart(@RequestParam(value = "InstanceId") String InstanceId, HttpServletResponse response)
            throws Exception {
        InputStream inputStream = null;
        try {
            String ProcessDefinitionId;
            List<String> activitis = new ArrayList<String>();
            ProcessInstance instance = runtimeService
                    .createProcessInstanceQuery().processInstanceId(InstanceId)
                    .singleResult();
            if (instance != null) {
                ProcessDefinitionId = instance.getProcessDefinitionId();
                List<Execution> executionList = runtimeService
                        .createExecutionQuery().processInstanceId(InstanceId)
                        .list();
                for (Execution execution : executionList) {
                    ExecutionEntity executionEntity = (ExecutionEntity) runtimeService
                            .createExecutionQuery()
                            .executionId(execution.getId()).singleResult();
                    activitis.add(executionEntity.getActivityId());
                }
            } else {
                HistoricProcessInstanceEntity hInstance = (HistoricProcessInstanceEntity) historyService
                        .createHistoricProcessInstanceQuery()
                        .processInstanceId(InstanceId).singleResult();
                if (hInstance == null) {
                    System.out.println("未找到流程实例：" + InstanceId);
                }
                ProcessDefinitionId = hInstance.getProcessDefinitionId();
            }
            // 取得设计图
            ProcessDefinition process = repositoryService
                    .createProcessDefinitionQuery()
                    .processDefinitionId(ProcessDefinitionId).singleResult();
            String diagramResourceName = process.getDiagramResourceName();
            InputStream diagram = repositoryService.getResourceAsStream(
                    process.getDeploymentId(), diagramResourceName);
            //绘制活动节点
            if (diagram != null) {
                if (instance != null && activitis.size() > 0) {
                    // 绘制图片
                    BufferedImage image = ImageIO.read(diagram);
                    Graphics2D g = (Graphics2D) image.getGraphics();
                    g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                            RenderingHints.VALUE_ANTIALIAS_ON);
                    g.setColor(Color.RED);
                    g.setStroke(new BasicStroke(2));
                    //取得设计图中所有的活动
                    ProcessDefinitionEntity def = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                            .getDeployedProcessDefinition(process.getId());
                    List<ActivityImpl> activitiList = def.getActivities();
                    // 获取当前运行状态
                    for (ActivityImpl activityImpl : activitiList) {
                        String id = activityImpl.getId();
                        if (activitis.contains(id)) {
                            g.drawRect(activityImpl.getX(),
                                    activityImpl.getY(),
                                    activityImpl.getWidth(),
                                    activityImpl.getHeight());
                        }
                    }
                    //输出

                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

                    ImageIO.write(image, "png", outputStream);
                    inputStream = new ByteArrayInputStream(
                            outputStream.toByteArray());
                } else {
                    inputStream = diagram;
                }
            } else {
                System.out.println("未找到设计图");
            }
            response.setContentType("image/png");
            OutputStream os = response.getOutputStream();
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
            }

            // 这里主要关闭。
            os.close();

            inputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 通过业务Id获取个人的任务Id
    @RequestMapping(value = "GetTaskIdFromBusinessId", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> GetTaskIdFromBusinessId(@RequestParam(value = "businessKey") String businessKey,
                                                       @RequestParam(value = "userCode") String userCode)
            throws SQLException {
        Map result = new HashMap();
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Task task = taskService.createTaskQuery()
                    .processInstanceBusinessKey(businessKey)
                    .taskAssignee(userCode).singleResult();
            result.put("taskId", task.getId());
            result.put("taskName", task.getName());
            result.put("ExecutionId", task.getExecutionId());
            result.put("Description", task.getDescription());
            result.put("ProcessInstanceId", task.getProcessInstanceId());
            result.put("ProcessDefinitionId", task.getProcessDefinitionId());
            result.put("ProcessDefinitionId", task.getProcessDefinitionId());
            result.put("Assignee", task.getAssignee());
            result.put("CreateTime", dateFormat.format(task.getCreateTime()));
            result.put("TaskDefinitionKey", task.getTaskDefinitionKey());
            result.put("ret", "Ok");
            result.put("msg", "成功");
        } catch (Exception e) {
            result.put("ret", "Error");
            result.put("msg", e.getMessage());
        }
        return result;
    }

    // 流程实例状态
    @RequestMapping(value = "InstanceState", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> InstanceState(@RequestParam(value = "instanceId") String instanceId)
            throws SQLException {
        Map result = new HashMap();
        List list = new ArrayList();
        try {
            String originator = "";
            List<HistoricVariableInstance> vars = historyService
                    .createHistoricVariableInstanceQuery()
                    .processInstanceId(instanceId).list();
            for (HistoricVariableInstance var : vars) {
                if ("originator".equals(var.getVariableName())
                        && var.getValue() != null) {
                    originator = var.getValue().toString();
                    break;
                }
            }
            List<HistoricActivityInstance> acts = historyService
                    .createHistoricActivityInstanceQuery()
                    .processInstanceId(instanceId)
                    .orderByHistoricActivityInstanceStartTime().asc().list();
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for (HistoricActivityInstance act : acts) {
                if ("startEvent".equals(act.getActivityType())
                        || "userTask".equals(act.getActivityType())) {
                    Map map = new HashMap();
                    map.put("ActivityId", act.getActivityId());
                    map.put("ActivityName", act.getActivityName());
                    map.put("ActivityType", act.getActivityType());
                    map.put("Id", act.getId());

                    if ("startEvent".equals(act.getActivityType())) {
                        map.put("Assignee", originator);
                        map.put("Idea", "发起");
                    } else {
                        map.put("Assignee", act.getAssignee());
                        for (HistoricVariableInstance var : vars) {
                            if (act.getTaskId().equals(var.getVariableName())) {
                                if (var.getValue() != null)
                                    map.put("Idea", var.getValue().toString());
                                else
                                    map.put("Idea", "");
                                break;
                            }
                        }
                    }

                    User user = identityService.createUserQuery()
                            .userId(map.get("Assignee").toString()).singleResult();
                    if (user != null)
                        map.put("AssigneeName", user.getFirstName());
                    else {
                        System.out.println(map.get("Assignee").toString() + ":未定义名字");
                        map.put("ActivityName", "未知");
                    }
                    map.put("StartTime", dateFormat.format(act.getStartTime()));
                    map.put("EndTime", act.getEndTime() != null ? dateFormat
                            .format(act.getEndTime()) : "");
                    list.add(map);
                }
            }
            result.put("list", list);
            result.put("ret", "OK");
            result.put("msg", "成功");
        } catch (Exception e) {
            result.put("ret", "Error");
            result.put("msg", e.getMessage());
        }
        return result;
    }

    // 完成任务
    @RequestMapping(value = "TaskComplete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> TaskComplete(@RequestParam(value = "taskId") String taskId,
                                            @RequestParam(value = "idea") String idea,
                                            @RequestParam(value = "parName") String[] parName,
                                            @RequestParam(value = "parVal") String[] parVal,
                                            @RequestParam(value = "V_IDEA") String V_IDEA,
                                            @RequestParam(value = "V_INPER") String V_INPER,
                                            @RequestParam(value = "V_NEXTPER") String V_NEXTPER,
                                            @RequestParam(value = "V_STEPNAME") String V_STEPNAME,
                                            @RequestParam(value = "V_STEPCODE") String V_STEPCODE,
                                            @RequestParam(value = "processKey") String processKey,
                                            @RequestParam(value = "businessKey") String businessKey) throws SQLException {
        Map result = new HashMap();
        Map map = new HashMap();
        String flowtype = "error";

        if (processKey.indexOf("Year") != -1) {
            flowtype = "年计划";
        }
        if (processKey.indexOf("Month") != -1) {
            flowtype = "月计划";
        }
        if (processKey.indexOf("Week") != -1) {
            flowtype = "周计划";
        }
        if (processKey.indexOf("WorkOrder") != -1) {
            flowtype = "工单";
        }
        if (processKey.indexOf("Fault") != -1) {
            flowtype = "事故";
        }
        if (processKey.indexOf("MaintainPlan") != -1) {
            flowtype = "维修计划";
        }
        HashMap data = activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER, V_INPER);

        for (int i = 0; i < parName.length; i++) {
            map.put(parName[i], parVal[i]);
            if (parName[i].equals("flow_yj")) {
                map.put(taskId, parVal[i]);
            }
        }

        try {

//            Date date = new Date();
//            Calendar c = Calendar.getInstance();
//            c.setTime(date);
//
//            c.add(Calendar.MONTH, 2);
//            c.set(Calendar.DAY_OF_MONTH, 0);
//            String time = c.get(Calendar.YEAR) + "-" + c.get(Calendar.MONTH) + 1 + "-" + c.get(Calendar.DATE) + "T23:59:59";
            String time = getShtgtime.Shtgtime();
            map.put("shtgtime", time);

            map.put("idea", idea);
            taskService.complete(taskId, map);
            result.put("ret", "任务提交成功");
            result.put("msg", "OK");
            String mes = amToMessController.MessageSend("1", flowtype, V_NEXTPER);
            if (mes.equals("true")) {
                cjyController.PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, V_NEXTPER, flowtype, "0");
            } else {
                cjyController.PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, V_NEXTPER, flowtype, "-1");
            }

        } catch (Exception e) {
            result.put("ret", "任务提交失败");
            result.put("msg", "Error");
        }

        return result;
    }


    // 完成任务
    @RequestMapping(value = "TaskCompletePL", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> TaskCompletePL(@RequestParam(value = "taskId") String taskId,
                                              @RequestParam(value = "idea") String idea,
                                              @RequestParam(value = "parName") String[] parName,
                                              @RequestParam(value = "parVal") String[] parVal,
                                              @RequestParam(value = "V_IDEA") String V_IDEA,
                                              @RequestParam(value = "V_INPER") String V_INPER,
                                              @RequestParam(value = "V_NEXTPER") String V_NEXTPER,
                                              @RequestParam(value = "V_STEPNAME") String V_STEPNAME,
                                              @RequestParam(value = "V_STEPCODE") String V_STEPCODE,
                                              @RequestParam(value = "processKey") String processKey,
                                              @RequestParam(value = "businessKey") String businessKey) throws SQLException {
        Map result = new HashMap();
        Map map = new HashMap();

        HashMap data = activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER, V_INPER);

        for (int i = 0; i < parName.length; i++) {
            map.put(parName[i], parVal[i]);
            if (parName[i].equals("flow_yj")) {
                map.put(taskId, parVal[i]);
            }
        }

        try {
            Date date = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.MONTH, 2);
            c.set(Calendar.DAY_OF_MONTH, 0);
//            String time = c.get(Calendar.YEAR) + "-" + c.get(Calendar.MONTH) + 1 + "-" + c.get(Calendar.DATE) + "T23:59:59";
            String time = getShtgtime.Shtgtime();
            map.put("shtgtime", time);
            map.put("idea", idea);
            taskService.complete(taskId, map);
            result.put("ret", "任务提交成功");
            result.put("msg", "OK");
        } catch (Exception e) {
            result.put("ret", "任务提交失败");
            result.put("msg", "Error");
        }

        return result;
    }

    /*
     * 批量审批
     * */
    @RequestMapping(value = "TaskCompleteList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> TaskCompleteList(@RequestParam(value = "V_IDEA") String V_IDEA,
                                                @RequestParam(value = "V_INPER") String V_INPER,
                                                @RequestParam(value = "FlowType") String FlowType,
                                                @RequestParam(value = "BusinessKeys") String[] BusinessKeys) throws SQLException {
        HashMap mapdata = new HashMap();
        Map acdata = new HashMap();
        HashMap nextPer = new HashMap();

        for (int i = 0; i < BusinessKeys.length; i++) {

            if (FlowType.equals("WeekPlan")) {
                /*
                 * 根据businessKey,FlowType获取业务数据
                 * */
                mapdata = pm_03Service.PRO_PM_03_PLAN_WEEK_GET(BusinessKeys[i]);
                List maplist = (List) mapdata.get("list");
                Map map = (Map) maplist.get(0);
                /*
                 *根据businessKey,v_inper获取activiti数据
                 * */
                acdata = GetTaskIdFromBusinessId(BusinessKeys[i], V_INPER);

                /*
                 * 获取下一步审批人信息
                 * */
                nextPer = hpService.PM_ACTIVITI_PROCESS_PER_SEL(map.get("V_ORGCODE").toString(), map.get("V_DEPTCODE").toString(), "", FlowType, acdata.get("TaskDefinitionKey").toString(), V_INPER, map.get("V_REPAIRMAJOR_CODE").toString(), "通过");


            }
        }
        return acdata;
    }


    /**
     * 激活流程活动，放弃当前任务,并向激活步骤
     *
     * @param instanceId 流程实例Id
     * @param activityId 活动Id
     * @param assignees  激活步骤用户
     * @return boolean
     */
    @RequestMapping(value = "activateActivityCancelCurrent", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> activateActivityCancelCurrent(@RequestParam(value = "businesskey") String businesskey,
                                                             @RequestParam(value = "flowtype") String flowtype,
                                                             @RequestParam(value = "instanceId") String instanceId,
                                                             @RequestParam(value = "activityId") String activityId,
                                                             @RequestParam(value = "flowStep") String flowStep,
                                                             @RequestParam(value = "assignees") String[] assignees) throws SQLException {

        Map map = new HashMap();
        boolean retsult = activitiService.activateActivityCancelCurrent(instanceId, activityId, flowStep, assignees);
        map.put("flag", retsult);
        return map;

    }

    /**
     * 获取流程设计中的活动信息
     *
     * @param instanceId 流程实例
     * @return List<ActivityEntity>
     */
    @RequestMapping(value = "getActivityList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getActivityList(@RequestParam(value = "instanceId") String instanceId) throws SQLException {

        Map map = new HashMap();
        List result = activitiService.getActivityList(instanceId);

        map.put("list", result);
        map.put("ret", "OK");
        map.put("msg", "成功");

        return map;

    }

    /*
     * 根据流程BUSINESSKEY，流程类型，获取流程processkey
     * */

    @RequestMapping(value = "getProcessAndOrgdept", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getProcessAndOrgdept(@RequestParam(value = "V_V_BUSINESSKEY") String V_V_BUSINESSKEY, @RequestParam(value = "V_V_ACTIVITI_TYPE") String V_V_ACTIVITI_TYPE) throws SQLException {

        Map result = activitiService.getProcessAndOrgdept(V_V_BUSINESSKEY, V_V_ACTIVITI_TYPE);
        return result;
    }

    /*
     * 根据父节点查询子组织机构树
     * */

    @RequestMapping(value = "PRO_BASE_DEPT_TREE", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> PRO_BASE_DEPT_TREE(@RequestParam(value = "V_V_DEPTCODE") String V_V_DEPTCODE) throws SQLException {

        List<Map> result = activitiService.PRO_BASE_DEPT_TREE(V_V_DEPTCODE);
        return result;
    }

    /*
     * 挂起流程实例
     * */

    @RequestMapping(value = "DeleteProcessInstance", method = RequestMethod.POST)
    @ResponseBody
    public Map DeleteProcessInstance(@RequestParam(value = "instanceId") String instanceId) throws SQLException {
        Map result = new HashMap();
        try {
            /*
             * 挂起流程
             * */
//            runtimeService.suspendProcessInstanceById(instanceId);

            /*
             * 删除流程
             * */
            runtimeService.deleteProcessInstance(instanceId, null);
            result.put("msg", "删除成功");
        } catch (Exception e) {
            result.put("msg", "删除失败");
        }
        return result;
    }

    /*
     * 激活流程实例
     * */

    @RequestMapping(value = "ActivateProcessInstance", method = RequestMethod.POST)
    @ResponseBody
    public Map ActivateProcessInstance(@RequestParam(value = "instanceId") String instanceId) throws SQLException {

        Map result = activitiService.ActivateProcessInstance(instanceId);
        return result;
    }

    /*
     * 修改流程变量
     * */

    @RequestMapping(value = "ChangeVariables", method = RequestMethod.POST)
    @ResponseBody
    public Map ChangeVariables(@RequestParam(value = "instanceId") String instanceId,
                               @RequestParam(value = "code") String code,
                               @RequestParam(value = "value") String value) throws SQLException {
        Map result = new HashMap();
        try {
            Task task = taskService.createTaskQuery().processInstanceId(instanceId).singleResult();
            Map<String, Object> variables = new HashMap<>();
            variables.put(code, value);
            taskService.setVariables(task.getId(), variables);
            result.put("msg", "success");
        } catch (Exception e) {
            result.put("msg", "fail");
        }
        return result;
    }

    /*
     * 获取流程变量
     * */

    @RequestMapping(value = "GetVariables", method = RequestMethod.POST)
    @ResponseBody
    public List GetVariables(@RequestParam(value = "processInstanceId") String processInstanceId) throws SQLException {
        List result = new ArrayList();
        try {
            Task task = taskService.createTaskQuery()
                    .processInstanceId(processInstanceId)
                    .singleResult();

            // BusinessKey
            ProcessInstance instance = runtimeService
                    .createProcessInstanceQuery()
                    .processInstanceId(task.getProcessInstanceId())
                    .singleResult();

            // ProcessVariables
            List<HistoricVariableInstance> vars = historyService
                    .createHistoricVariableInstanceQuery()
                    .processInstanceId(instance.getId()).list();
            for (HistoricVariableInstance var : vars) {
                Map map = new HashMap();
                map.put("code", var.getVariableName());
                map.put("value", var.getValue());
                result.add(map);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    //会签流程发起
    @RequestMapping(value = "StratProcessList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> StratProcessList(@RequestParam(value = "V_INPER") String V_INPER,
                                                @RequestParam(value = "V_NEXTPER") String[] V_NEXTPER,
                                                @RequestParam(value = "V_IDEA") String V_IDEA,
                                                @RequestParam(value = "V_STEPNAME") String V_STEPNAME,
                                                @RequestParam(value = "V_STEPCODE") String V_STEPCODE,
                                                @RequestParam(value = "processKey") String processKey,
                                                @RequestParam(value = "businessKey") String businessKey,
                                                @RequestParam(value = "parName") String[] parName,
                                                @RequestParam(value = "parVal") String[] parVal,
                                                HttpServletRequest request, HttpServletResponse response)
            throws SQLException {
        Map result = new HashMap();
        Map param = new HashMap();

        String flowtype = "error";

        if (processKey.indexOf("Month") != -1) {
            flowtype = "月计划";
        }
        if (processKey.indexOf("Week") != -1) {
            flowtype = "周计划";
        }
        if (processKey.indexOf("WorkOrder") != -1) {
            flowtype = "工单";
        }

        String perList = "";

        int num = (int) taskService.createTaskQuery().processVariableValueLike("flow_businesskey", businessKey).count();

        if (!businessKey.equals("")) {
            if (num == 0) {
                List list = new ArrayList();
                for (int i = 0; i < V_NEXTPER.length; i++) {
                    list.add(V_NEXTPER[i]);
                    activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER[i], V_INPER);
                }

                Date date = new Date();
                Calendar c = Calendar.getInstance();
                c.setTime(date);
                c.add(Calendar.MONTH, 2);
                c.set(Calendar.DAY_OF_MONTH, 0);
                String time = getShtgtime.Shtgtime();
                param.put("shtgtime", time);

                try {
                    for (int i = 0; i < parName.length; i++) {
                        if (parName[i].toString().equals("Next_StepCode")) {
                            perList = parVal[i].toString();
                        } else {
                            param.put(parName[i].toString(), parVal[i].toString());
                        }
                    }

                    param.put("idea", V_IDEA);
                    param.put("shtgtime", time);
                    param.put(perList, list);

                    ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processKey, businessKey,
                            param);

                    /*
                     * 等待定时发送即时通
                     * */
                    for (int i = 0; i < list.size(); i++) {
                        cjyController.PRO_AM_SEND_LOG_SET(infopuburl, infopubusername, infopubpassword, list.get(i).toString(), flowtype, "-1");
                    }

                    result.put("id", processInstance.getId());
                    result.put("InstanceId", processInstance.getProcessInstanceId());
                    result.put("BusinessKey", processInstance.getBusinessKey());
                    result.put("ProcessId", processInstance.getProcessDefinitionId());
                    result.put("ret", "OK");
                    result.put("msg", "流程发起成功");
                } catch (Exception e) {
                    e.printStackTrace();
                    result.put("ret", "ERROR");
                    result.put("msg", "流程发起失败");
                }
            } else {
                result.put("ret", "ERROR");
                result.put("msg", "流程发起失败,流程businesskey重复");
            }
        } else {
            result.put("ret", "ERROR");
            result.put("msg", "流程发起失败,流程businesskey为空");
        }

        return result;
    }

    // 完成任务
    @RequestMapping(value = "TaskCompleteHQ", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> TaskCompleteHQ(@RequestParam(value = "taskId") String taskId,
                                              @RequestParam(value = "idea") String idea,
                                              @RequestParam(value = "parName") String[] parName,
                                              @RequestParam(value = "parVal") String[] parVal,
                                              @RequestParam(value = "V_NEXTPER") String[] V_NEXTPER) throws SQLException {
        Map result = new HashMap();
        Map map = new HashMap();

        Map param = new HashMap();

        List list = new ArrayList();
        for (int i = 0; i < V_NEXTPER.length; i++) {
            list.add(V_NEXTPER[i]);
        }

        String perList = "";
        for (int i = 0; i < parName.length; i++) {
            map.put(parName[i], parVal[i]);
            if (parName[i].equals("flow_yj")) {
                map.put(taskId, parVal[i]);
            } else if (parName[i].toString().equals("Next_StepCode")) {
                perList = parVal[i].toString();
            } else {
                map.put(parName[i], parVal[i]);
            }
        }

        map.put(perList, list);

        try {
            Date date = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.MONTH, 2);
            c.set(Calendar.DAY_OF_MONTH, 0);
            String time = getShtgtime.Shtgtime();
            map.put("shtgtime", time);
            map.put("idea", idea);
            taskService.complete(taskId, map);
            result.put("ret", "任务提交成功");
            result.put("msg", "OK");
        } catch (Exception e) {
            result.put("ret", "任务提交失败");
            result.put("msg", "Error");
        }

        return result;
    }
//    //根据时间code查询已办任务
//    @RequestMapping(value = "QueryhistoryTaskList", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> QueryhistoryTaskList(@RequestParam(value = "PersonCode") String PersonCode,
//                                                    @RequestParam(value = "beginTime") String beginTime,
//                                                    @RequestParam(value = "endTime") String endTime,
//                                                    @RequestParam(value = "start") String start,
//                                                    @RequestParam(value = "limit") String limit)
//            throws SQLException {
//        Map result = new HashMap();
//        List resultlist = new ArrayList();
//        Map<String, Object> ProcessType = activitiService.QueryProcessType();
//        List list = (List) ProcessType.get("list");
//        String[] nameSapce = new String[list.size()];
//        for (int i = 0; i < list.size(); i++) {
//            Map map = (Map) list.get(i);
//            nameSapce[i] = map.get("V_FLOWTYPE_CODE").toString();
//        }
//        try {
//            List<HistoricTaskInstance> tasks;
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//            Date b1 = sdf.parse(beginTime);
//            Date e1 = sdf.parse(endTime+1);
//
//            tasks = historyService.createHistoricTaskInstanceQuery().taskAssignee(PersonCode).taskCompletedAfter(b1).taskCompletedBefore(e1)
//                    .finished().orderByHistoricTaskInstanceEndTime().desc()
//                    .listPage(Integer.valueOf(start), Integer.valueOf(limit));
//
//            int total = (int) historyService.createHistoricTaskInstanceQuery().taskAssignee(PersonCode).taskCompletedAfter(b1).taskCompletedBefore(e1).finished().count();
//
//
//            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//
//            for (HistoricTaskInstance task : tasks) {
//                Map taskmap = new HashMap();
//                if(!task.getDeleteReason().equals("deleted")) {
//                    if (task.getTaskDefinitionKey().equals("gdys")) {
//                        taskmap.put("Id", task.getId());
//                        taskmap.put("Name", task.getName());
//                        taskmap.put("ExecutionId", task.getExecutionId());
//                        taskmap.put("Description", task.getDescription());
//                        taskmap.put("ProcessInstanceId", task.getProcessInstanceId());
//                        taskmap.put("ProcessDefinitionId", task.getProcessDefinitionId());
//                        taskmap.put("Assignee", task.getAssignee());
//                        //taskmap.put("StartTime", dateFormat.format(task.getStartTime()));
//                        if (task.getEndTime() != null) {
//                            taskmap.put("endTime", dateFormat.format(task.getEndTime()));
//                        } else {
//                            taskmap.put("endTime", "");
//                        }
//                        taskmap.put("TaskDefinitionKey", task.getTaskDefinitionKey());
//                        HistoricProcessInstance instance = historyService
//                                .createHistoricProcessInstanceQuery()
//                                .processInstanceId(task.getProcessInstanceId())
//                                .singleResult();
//                        if (instance != null) {
//                            taskmap.put("BusinessKey", instance.getBusinessKey());
//                            taskmap.put("ProcessDefinitionName", instance.getProcessDefinitionName());
//                            taskmap.put("ProcessDefinitionKey", instance.getProcessDefinitionKey());
//                        }
//
//                        // ProcessVariables
//                        List<HistoricVariableInstance> vars = historyService
//                                .createHistoricVariableInstanceQuery()
//                                .processInstanceId(instance.getId()).list();
//
//                        for (HistoricVariableInstance var : vars) {
//                            taskmap.put(var.getVariableName(), var.getValue());
//                        }
//                        User user = identityService.createUserQuery()
//                                .userId(taskmap.get("originator").toString()).singleResult();
//
//                        if (user != null)
//                            taskmap.put("startName", user.getFirstName());
//                        else {
//                            taskmap.put("startName", "未知");
//                        }
//
//                        resultlist.add(taskmap);
//                    }
//                }
//            }
//
//            result.put("list", resultlist);
//            result.put("total", total);
//            result.put("count", result.size());
//            result.put("msg", "Ok");
//        } catch (Exception e) {
//            e.printStackTrace();
//            result.put("msg", "Error");
//        }
//
//        return result;
//    }

    //---update 2018-08-30
//    Task task=taskService.createTaskQuery() // 创建任务查询
//            .taskId(taskId) // 根据任务id查询
//            .singleResult();
//    @RequestMapping(value = "getNodePerson", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> getNodePerson(@RequestParam(value = "businessKey") String businessKey,
//                                                    @RequestParam(value = "ActivitiId") String ActivitiId,
//                                                    HttpServletRequest request,
//                                                    HttpServletResponse response) throws Exception {
//
//        List<Map> resList = new ArrayList<>();
//        Map result = new HashMap();
//        HistoricProcessInstance instance= historyService
//                .createHistoricProcessInstanceQuery()
//                .processInstanceBusinessKey(businessKey).listPage(0, 1)
//                .get(0);//GetInstanceFromBusinessId
//        Map map = (Map) data.get("list");
//        String percode = map.get("Assignee").toString();
//        List<Map<String, Object>> postlist = (List) cjyService.PRO_BASE_POST_GET_BYPER(percode).get("list");
//        String post = "";
//        for (int j = 0; j < postlist.size(); j++) {
//            if (j == 0) {
//                post = postlist.get(j).get("V_POSTNAME").toString();
//            } else {
//                post += "," + postlist.get(j).get("V_POSTNAME").toString();
//            }
//
//        }
//
//        map.put("post", post);
//        resList.add(map);
//
//
//        result.put("list", resList);
//        return result;
//    }
}
