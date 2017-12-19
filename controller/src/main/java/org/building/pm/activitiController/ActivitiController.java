package org.building.pm.activitiController;


import org.activiti.engine.*;
import org.activiti.engine.history.*;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.HistoricProcessInstanceEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.NativeTaskQuery;
import org.activiti.engine.task.Task;
import org.building.pm.service.ActivitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

/**
 * Created by zjh on 2017/1/22.
 * <p>
 *流程图controller
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


        HashMap data = activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER, V_INPER);

        String ret = (String) data.get("RET");
        result.put("RET", ret);

        try {
            for (int i = 0; i < parName.length; i++) {
                param.put(parName[i].toString(), parVal[i].toString());
            }

            param.put("idea",V_IDEA);

            ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processKey, businessKey,
                    param);

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
                    .sql(makeNativeQuerySQLCountHistory(nameSapce,beginTime,endTime))
                    .parameter("assignee", PersonCode).parameter("startTime", beginTime).parameter("endTime", endTime).count();
            tasks = historyService
                    .createNativeHistoricTaskInstanceQuery()
                    .sql(makeNativeQuerySQLResultHistory(nameSapce,beginTime,endTime))
                    .parameter("assignee", PersonCode).parameter("startTime", beginTime).parameter("endTime", endTime).listPage(Integer.valueOf(start), Integer.valueOf(limit));

            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            for (HistoricTaskInstance task : tasks) {
                Map taskmap = new HashMap();
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
                    taskmap.put("startName",user.getFirstName());
                else {
                    taskmap.put("startName","未知");
                }


                resultlist.add(taskmap);


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

    public String makeNativeQuerySQLHistory(String select, String[] nameSpace,String startTime,String endTime) {
        String categorySQL = "";
        if (nameSpace != null && nameSpace.length > 0) {
            int i = 1;
            categorySQL += " AND (";
            for (String categoryItem : nameSpace) {
                categorySQL += " P.CATEGORY_ = '" + categoryItem + "'";
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
                    "  TO_DATE(" + '\''+ startTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
                    + "AND RES.START_TIME_ <=\n" +
                    "  TO_DATE(" + '\''+ endTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
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

    public String makeNativeQuerySQLHistoryCount(String select, String[] nameSpace,String startTime,String endTime) {
        String categorySQL = "";
        if (nameSpace != null && nameSpace.length > 0) {
            int i = 1;
            categorySQL += " AND (";
            for (String categoryItem : nameSpace) {
                categorySQL += " P.CATEGORY_ = '" + categoryItem + "'";
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
                    "  TO_DATE(" + '\''+ startTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
                    + "AND RES.START_TIME_ <=\n" +
                    "  TO_DATE(" + '\''+ endTime + '\'' + ", 'yyyy-mm-dd hh24:mi:ss')"
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


    public String makeNativeQuerySQLCountHistory(String[] nameSpace,String startTime,String endTime) {
        return makeNativeQuerySQLHistoryCount("count(*)", nameSpace,startTime,endTime);
    }

    private String makeNativeQuerySQLResultHistory(String[] nameSpace,String startTime,String endTime) {
        return makeNativeQuerySQLHistory("RES.*", nameSpace, startTime,endTime);
    }
    /*
    * nameSpace  人员编码查询当前人员代办信息
    * */
    @RequestMapping(value = "QueryTaskList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskList(@RequestParam(value = "PersonCode") String PersonCode,
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
            List<Task> taskList = null;

            NativeTaskQuery nativeTaskQuery = taskService
                    .createNativeTaskQuery().sql(makeNativeQuerySQLResult(nameSapce));

            nativeTaskQuery.parameter("assignee", PersonCode);

            int total = (int) taskService.createNativeTaskQuery()
                    .sql(makeNativeQuerySQLCount(nameSapce))
                    .parameter("assignee", PersonCode).count();

            taskList = nativeTaskQuery.listPage(Integer.valueOf(start), Integer.valueOf(limit));

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
                User user = identityService.createUserQuery()
                        .userId(taskmap.get("originator").toString()).singleResult();

                if (user != null)
                    taskmap.put("startName",user.getFirstName());
                else {
                    taskmap.put("startName","未知");
                }
                resultlist.add(taskmap);
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

    /*
    * nameSpace  当前人查询年计划的代办数量
    * */
    @RequestMapping(value = "QueryTaskListByYear", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskListByYear(@RequestParam(value = "PersonCode") String PersonCode
                                            )
            throws SQLException {
        Map result = new HashMap();
        String[] nameSapce = new String[1];
        nameSapce[0] = "YearPlan";
        try {
            int total = (int) taskService.createNativeTaskQuery()
                    .sql(makeNativeQuerySQLCount(nameSapce))
                    .parameter("assignee", PersonCode).count();
            result.put("total", total);
            result.put("msg", "Ok");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("msg", "Error");
        }

        return result;
    }

    /*
    * nameSpace  当前人查询月计划的代办数量
    * */
    @RequestMapping(value = "QueryTaskListByMonth", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskListByMonth(@RequestParam(value = "PersonCode") String PersonCode)
            throws SQLException {
        Map result = new HashMap();
        String[] nameSapce = new String[1];
        nameSapce[0] = "MonthPlan";
        try {
            int total = (int) taskService.createNativeTaskQuery()
                    .sql(makeNativeQuerySQLCount(nameSapce))
                    .parameter("assignee", PersonCode).count();
            result.put("total", total);
            result.put("msg", "Ok");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("msg", "Error");
        }

        return result;
    }

    /*
   * nameSpace  当前人查询周计划的代办数量
   * */
    @RequestMapping(value = "QueryTaskListByWeek", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> QueryTaskListByWeek(@RequestParam(value = "PersonCode") String PersonCode)
            throws SQLException {
        Map result = new HashMap();
        String[] nameSapce = new String[1];
        nameSapce[0] = "WeekPlan";
        try {
            int total = (int) taskService.createNativeTaskQuery()
                    .sql(makeNativeQuerySQLCount(nameSapce))
                    .parameter("assignee", PersonCode).count();
            result.put("total", total);
            result.put("msg", "Ok");
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
        System.out.println("我是SQL语句22222222222222222222 = " + sql);
        return sql;
    }

    public String makeNativeQuerySQLCount(String[] nameSpace) {
        return makeNativeQuerySQL("count(*)", nameSpace);
    }

    private String makeNativeQuerySQLResult(String[] nameSpace) {
        return makeNativeQuerySQL("t.*", nameSpace);
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
            Map data =  InstanceState(instance.getId());
            List<Map<String, Object>> list = (List) data.get("list");
            result.put("list", list.get(list.size()-1));
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

        HashMap data = activitiService.PM_ACTIVITI_STEP_LOG_SET(businessKey, processKey, V_STEPCODE, V_STEPNAME, V_IDEA, V_NEXTPER, V_INPER);


        for (int i = 0; i < parName.length; i++) {
            map.put(parName[i], parVal[i]);
            if(parName[i].equals("flow_yj")){
                map.put(taskId,  parVal[i]);
            }
        }
        try {
            map.put("idea",idea);
            taskService.complete(taskId, map);
            result.put("ret", "任务提交成功");
            result.put("msg", "OK");
        } catch (Exception e) {
            result.put("ret", "任务提交失败");
            result.put("msg", "Error");
        }
        return result;
    }


}
