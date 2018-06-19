package org.building.pm.service;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import oracle.jdbc.OracleTypes;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.RuntimeServiceImpl;
import org.activiti.engine.impl.interceptor.Command;
import org.activiti.engine.impl.interceptor.CommandContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.impl.pvm.process.TransitionImpl;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.log4j.Logger;
import org.building.pm.Entity.ActivityEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;


/**
 * Created by hp on 2017/11/15.
 */

@Service
public class ActivitiService {
    private static final Logger logger = Logger.getLogger(InfoService.class.getName());

    protected final String NUMBER_OF_INSTANCES = "nrOfInstances";
    protected final String NUMBER_OF_ACTIVE_INSTANCES = "nrOfActiveInstances";

    @Value("#{configProperties['system.copyright']}")
    private String copyright;

    @Autowired
    private ComboPooledDataSource dataSources;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private HistoryService historyService;

    private List<HashMap> ResultHash(ResultSet rs) throws SQLException {

        List<HashMap> result = new ArrayList<HashMap>();

        ResultSetMetaData rsm = rs.getMetaData();

        int colNum = 0;

        colNum = rsm.getColumnCount();

        while (rs.next()) {
            HashMap model = new HashMap();
            for (int i = 1; i <= rsm.getColumnCount(); i++) {
                if (rsm.getColumnType(i) == 91) {
                    model.put(rsm.getColumnName(i),
                            rs.getString(i) == null ? "" : rs.getString(i)
                                    .split("\\.")[0]);
                } else {
                    if (rsm.getColumnType(i) == 2) {
                        if (rs.getString(i) == null) {
                            model.put(rsm.getColumnName(i), "");
                        } else {
                            model.put(rsm.getColumnName(i), rs.getDouble(i));
                        }
                    } else {
                        model.put(rsm.getColumnName(i),
                                rs.getString(i) == null ? "" : rs.getString(i)
                                        .toString().replaceAll("\\n", ""));
                    }
                }
            }
            result.add(model);
        }
        rs.close();

        return result;
    }


    public HashMap PM_ACTIVITI_STEP_LOG_SET(String V_V_BUSINESS_GUID, String V_V_PROCESS_GUID, String V_STEPCODE, String V_STEPNAME, String V_IDEA, String V_NEXTPER, String V_INPER) throws SQLException {

        logger.info("begin PM_ACTIVITI_STEP_LOG_SET");

        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(true);
            cstmt = conn.prepareCall("{call PM_ACTIVITI_STEP_LOG_SET" + "(:V_V_BUSINESS_GUID,:V_V_PROCESS_GUID,:V_STEPCODE,:V_STEPNAME,:V_IDEA,:V_NEXTPER,:V_INPER,:V_INFO)}");
            cstmt.setString("V_V_BUSINESS_GUID", V_V_BUSINESS_GUID);
            cstmt.setString("V_V_PROCESS_GUID", V_V_PROCESS_GUID);
            cstmt.setString("V_STEPCODE", V_STEPCODE);
            cstmt.setString("V_STEPNAME", V_STEPNAME);
            cstmt.setString("V_IDEA", V_IDEA);
            cstmt.setString("V_NEXTPER", V_NEXTPER);
            cstmt.setString("V_INPER", V_INPER);
            cstmt.registerOutParameter("V_INFO", OracleTypes.VARCHAR);

            cstmt.execute();
            result.put("RET", cstmt.getString("V_INFO"));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_ACTIVITI_PROCESS_SET");
        return result;
    }


    public HashMap QueryProcessType() throws SQLException {

        logger.info("begin PM_FLOW_TYPE_SEL");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PM_FLOW_TYPE_SEL" + "(:V_CURSOR)}");
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PM_FLOW_TYPE_SEL");
        return result;
    }

    public HashMap PRO_WORKORDER_SPARE_GET(String OrderGuid) throws SQLException {

        logger.info("begin PRO_PM_WORKORDER_SPARE_VIEW");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_PM_WORKORDER_SPARE_VIEW" + "(:V_V_ORDERGUID,:V_CURSOR)}");
            cstmt.setString("V_V_ORDERGUID", OrderGuid);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_PM_WORKORDER_SPARE_VIEW");
        return result;
    }

    public boolean activateActivityCancelCurrent(String instanceId, String activityId, String flowStep, String[] assignees) throws SQLException {
        try {
            Map<String, Object> variables;
            ProcessInstance instance = runtimeService.createProcessInstanceQuery()
                    .processInstanceId(instanceId).singleResult();
            if (instance == null) {
                logger.error("实例未找到:" + instanceId);
                return false;
            }
            // 取得流程定义
            ProcessDefinitionEntity definition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                    .getDeployedProcessDefinition(instance.getProcessDefinitionId());
            if (definition == null) {
                logger.error("流程定义未找到");
                return false;
            }
            // 当前活动
            List<String> activitis = new ArrayList<>();
            List<Execution> executionList = runtimeService.createExecutionQuery()
                    .processInstanceId(instanceId).list();
            for (Execution execution : executionList) {
                ExecutionEntity executionEntity = (ExecutionEntity) runtimeService.createExecutionQuery()
                        .executionId(execution.getId()).singleResult();
                activitis.add(executionEntity.getActivityId());
            }

            List<String> activitisnew = new ArrayList<>();
            for (String act : activitis) {
                if (act == null || "".equals(act) || "null".equals(act)) continue;
                if (activitisnew.contains(act)) continue;
                activitisnew.add(act);
            }
            if (activitisnew.size() < 1) {
                logger.error("未找到活动的步骤");
                return false;
            }
            if (activitisnew.size() > 1) {
                logger.error("找到多个活动的步骤,请先取消多余的活动");
                return false;
            }
            ActivityImpl currActivity = definition.findActivity(activitisnew.get(0));
            ActivityImpl runActivity = definition.findActivity(activityId);
            List<PvmTransition> oriPvmTransitionList = new ArrayList<>();
            // 清除当前活动的出口
            List<PvmTransition> pvmTransitionList = currActivity.getOutgoingTransitions();
            oriPvmTransitionList.addAll(pvmTransitionList);
            pvmTransitionList.clear();
            // 建立新方向
            TransitionImpl newTransition = currActivity.createOutgoingTransition();
            newTransition.setDestination(runActivity);
            // 完成任务
            List<Task> nextTasks = taskService.createTaskQuery()
                    .processInstanceId(instance.getId()).taskDefinitionKey(currActivity.getId()).list();
            for (Task currTask : nextTasks) {
                if (!currTask.isSuspended()) {
                    variables = currTask.getProcessVariables();
                    for (int i = 0; i < assignees.length; i++) {
                        variables.put(flowStep, assignees[i].toString());
                    }
                    taskService.complete(currTask.getId(), variables);

                    historyService.deleteHistoricTaskInstance(currTask.getId());
                } else {
                    cancelActivityTask(currTask.getId());
                    logger.error("包含子步骤,不能完成,强制删除");
                }
            }
            // 恢复方向
            runActivity.getIncomingTransitions().remove(newTransition);
            List<PvmTransition> pvmTList = currActivity.getOutgoingTransitions();
            pvmTList.clear();
            pvmTransitionList.addAll(oriPvmTransitionList);
            // 调整处理人
            return adjustActivityAssignee(instance.getId(), runActivity.getId(), assignees);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    /**
     * 放弃任务
     *
     * @param taskId 任务Id
     * @return boolean
     */
    private boolean cancelActivityTask(final String taskId) {
        try {
            final TaskEntity taskEntity = (TaskEntity) taskService.createTaskQuery()
                    .taskId(taskId).singleResult();
            final ExecutionEntity executionEntity = (ExecutionEntity) runtimeService.createExecutionQuery().
                    executionId(taskEntity.getExecutionId()).singleResult();
            ((RuntimeServiceImpl) runtimeService).getCommandExecutor().execute(new Command<Void>() {
                @Override
                public Void execute(CommandContext commandContext) {
                    taskEntity.setExecutionId(null);
                    taskService.saveTask(taskEntity);
                    taskService.deleteTask(taskId, true);

                    if (executionEntity.getParentId() != null) {
                        ExecutionEntity parentExecution = (ExecutionEntity) runtimeService.createExecutionQuery()
                                .executionId(executionEntity.getParentId()).singleResult();
                        if (parentExecution.getVariablesLocal().containsKey(NUMBER_OF_INSTANCES)) {
                            Integer numInstance = (Integer) parentExecution.getVariableLocal(NUMBER_OF_INSTANCES);
                            parentExecution.setVariableLocal(NUMBER_OF_INSTANCES, numInstance - 1);
                        }
                        if (parentExecution.getVariablesLocal().containsKey(NUMBER_OF_ACTIVE_INSTANCES)) {
                            Integer numActive = (Integer) parentExecution.getVariableLocal(NUMBER_OF_ACTIVE_INSTANCES);
                            parentExecution.setVariableLocal(NUMBER_OF_ACTIVE_INSTANCES, numActive - 1);
                        }
                    }
                    executionEntity.remove();
                    return null;
                }
            });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean adjustActivityAssignee(String instanceId, String activityId, String[] assignees) {
        try {
            boolean flag = true;
            List<Task> runTasks = taskService.createTaskQuery()
                    .processInstanceId(instanceId).taskDefinitionKey(activityId).list();

            for (int i = 0; i < assignees.length; i++) {
                flag = addActivityTask(instanceId, activityId, assignees[i].toString());
            }

            if (flag) {
                for (Task task : runTasks) {
                    cancelActivityTask(task.getId());
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 增加活动的任务
     *
     * @param instanceId 流程实例Id
     * @param activityId 活动Id
     * @param assignee   指派的用户
     * @return boolean
     */
    private boolean addActivityTask(String instanceId, final String activityId, final String assignee) {
        return addActivityTask(instanceId, activityId, assignee, false);
    }

    private boolean addActivityTask(String instanceId, final String activityId, final String assignee, boolean check) {
        try {
            final List<Task> tasks = taskService.createTaskQuery().processInstanceId(instanceId)
                    .taskDefinitionKey(activityId).list();
            if (check) {
                if (checkAssignee(tasks, assignee)) {
                    logger.error("用户已经包含在任务中了.");
                    return false;
                }
            }
            if (tasks.size() > 0) {
                TaskEntity rootTempTask = null;
                for (Task task : tasks) {
                    if (task.getParentTaskId() == null) {
                        rootTempTask = (TaskEntity) task;
                        break;
                    }
                }
                final TaskEntity tempTask = rootTempTask;
                final ExecutionEntity tempExecution = (ExecutionEntity) runtimeService.createExecutionQuery()
                        .executionId(tempTask.getExecutionId()).singleResult();
                if (tempExecution.getParentId() == null || tempExecution.getParentId().equals(instanceId)) {
                    logger.error("addActivityTask:单任务活动不能添加用户");
                    return false;
                } else {
                    final ExecutionEntity parentExecution = (ExecutionEntity) runtimeService.createExecutionQuery()
                            .executionId(tempExecution.getParentId()).singleResult();
                    ((RuntimeServiceImpl) runtimeService).getCommandExecutor().execute(new Command<Void>() {

                        @Override
                        public Void execute(CommandContext commandContext) {
                            TaskEntity newTask = (TaskEntity) taskService.newTask();
                            ExecutionEntity newExecution = parentExecution.createExecution();
                            newExecution.setScope(false);
                            newExecution.setConcurrent(true);
                            copyTaskEntity(tempTask, newTask);

                            newTask.setAssignee(assignee.toString());

                            newTask.setExecutionId(newExecution.getId());
                            taskService.saveTask(newTask);
                            if (parentExecution.getVariablesLocal().containsKey(NUMBER_OF_INSTANCES)) {
                                Integer numInstance = (Integer) parentExecution.getVariableLocal(NUMBER_OF_INSTANCES);
                                parentExecution.setVariableLocal(NUMBER_OF_INSTANCES, numInstance + 1);
                            }
                            if (parentExecution.getVariablesLocal().containsKey(NUMBER_OF_ACTIVE_INSTANCES)) {
                                Integer numActive = (Integer) parentExecution.getVariableLocal(NUMBER_OF_ACTIVE_INSTANCES);
                                parentExecution.setVariableLocal(NUMBER_OF_ACTIVE_INSTANCES, numActive + 1);
                            }
                            return null;
                        }
                    });
                }
                return true;
            } else {
                logger.error("不能找到模板任务");
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 检查用户是否已经在任务中了
     *
     * @param tasks    任务集合
     * @param assignee 用户
     * @return true:已经包含
     */
    private boolean checkAssignee(List<Task> tasks, String assignee) {
        for (Task task : tasks) {
            if (assignee.toString().equals(task.getAssignee())) return true;
        }
        return false;
    }


    /**
     * 复制Task属性
     *
     * @param ori  源 Task
     * @param dest 目标 Task
     */
    private void copyTaskEntity(TaskEntity ori, TaskEntity dest) {
        dest.setProcessInstanceId(ori.getProcessInstanceId());
        dest.setProcessDefinitionId(ori.getProcessDefinitionId());
        dest.setParentTaskId(ori.getParentTaskId());
        dest.setName(ori.getName());
        dest.setDescription(ori.getDescription());
        dest.setTaskDefinitionKey(ori.getTaskDefinitionKey());
        dest.setFormKey(ori.getFormKey());
        dest.setExecutionVariables(ori.getVariables());
        dest.setSuspensionState(ori.getSuspensionState());
        dest.setDueDate(ori.getDueDate());
    }


    public List getActivityList(String instanceId) {
        List list = new ArrayList<>();
        try {
            ProcessInstance instance = runtimeService
                    .createProcessInstanceQuery().processInstanceId(instanceId)
                    .singleResult();
            if (instance == null) {
                logger.error("实例未找到:" + instanceId);
                return null;
            }
            // 取设计的用户节点
            List<String> activitis = new ArrayList<String>();
            List<Execution> executionList = runtimeService
                    .createExecutionQuery().processInstanceId(instanceId)
                    .list();
            for (Execution execution : executionList) {
                ExecutionEntity executionEntity = (ExecutionEntity) runtimeService
                        .createExecutionQuery().executionId(execution.getId())
                        .singleResult();
                if (executionEntity.isActive())
                    activitis.add(executionEntity.getActivityId());
            }
            ProcessDefinitionEntity definition = (ProcessDefinitionEntity) ((RepositoryServiceImpl) repositoryService)
                    .getDeployedProcessDefinition(instance
                            .getProcessDefinitionId());
            List<ActivityImpl> activitiList = definition.getActivities();
            for (ActivityImpl activityImpl : activitiList) {
                ActivityEntity item = new ActivityEntity();
                if (activityImpl.getProperties().get("type") != null
                        && "userTask".equals(activityImpl.getProperties()
                        .get("type").toString())) {
                    item.setId(activityImpl.getId());
                    item.setName(activityImpl.getProperties().get("name")
                            .toString());
                    item.setX(activityImpl.getX());
                    item.setY(activityImpl.getY());
                    item.setWidth(activityImpl.getWidth());
                    item.setHeight(activityImpl.getHeight());
                    if (activitis.contains(activityImpl.getId())) {
                        item.setRunning(true);
                    } else {
                        item.setRunning(false);
                    }
                    list.add(item);
                }
            }
            Collections.sort(list);
            return list;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return null;
        }
    }

    public HashMap getProcessAndOrgdept(String businesskey, String flowtype) throws SQLException {

        logger.info("begin ACTIVITI_MANAGE.getProcessAndOrgdept");
        HashMap result = new HashMap();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call ACTIVITI_MANAGE.getProcessAndOrgdept" + "(:V_V_BUSINESSKEY,:V_V_ACTIVITI_TYPE,:V_CURSOR)}");
            cstmt.setString("V_V_BUSINESSKEY", businesskey);
            cstmt.setString("V_V_ACTIVITI_TYPE", flowtype);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();
            result.put("list", ResultHash((ResultSet) cstmt.getObject("V_CURSOR")));
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end ACTIVITI_MANAGE.getProcessAndOrgdept");
        return result;
    }

    public List<Map> PRO_BASE_DEPT_TREE(String deptcode) throws SQLException {

        logger.info("begin PRO_BASE_DEPT_TREE");
        List<Map> result = new ArrayList<Map>();
        Connection conn = null;
        CallableStatement cstmt = null;
        try {
            conn = dataSources.getConnection();
            conn.setAutoCommit(false);
            cstmt = conn.prepareCall("{call PRO_BASE_DEPT_TREE" + "(:V_V_DEPTCODE,:V_CURSOR)}");
            cstmt.setString("V_V_DEPTCODE", deptcode);
            cstmt.registerOutParameter("V_CURSOR", OracleTypes.CURSOR);
            cstmt.execute();

            List list = ResultHash((ResultSet) cstmt.getObject("V_CURSOR"));

            for (int i = 0; i < list.size(); i++) {
                Map map = (Map) list.get(i);

                Map temp = new HashMap();
                if (map.get("V_DEPTCODE").toString().equals(deptcode)) {
                    temp.put("parentid", map.get("V_DEPTCODE_UP").toString());
                    temp.put("sid", map.get("V_DEPTCODE").toString());
                    temp.put("text", map.get("V_DEPTNAME").toString());
                    temp.put("expanded", false);
                    temp.put("finishflag", false);
                    temp.put("children", createOrgChildTree(list, map.get("V_DEPTCODE").toString()));
                    result.add(temp);
                }
            }

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            cstmt.close();
            conn.close();
        }
        logger.debug("result:" + result);
        logger.info("end PRO_BASE_DEPT_TREE");
        return result;
    }

    public List createOrgChildTree(List list, String upcode) {
        List result = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            Map map = (Map) list.get(i);
            Map temp = new HashMap();
            if (map.get("V_DEPTCODE_UP").toString().equals(upcode)) {
                temp.put("parentid", map.get("V_DEPTCODE_UP").toString());
                temp.put("sid", map.get("V_DEPTCODE").toString());
                temp.put("text", map.get("V_DEPTNAME").toString());
                temp.put("leaf", false);
                temp.put("expanded", false);
                if (IfHasDeptChildNode(list, map.get("V_DEPTCODE").toString())) {
                    temp.put("children", createOrgChildTree(list, map.get("V_DEPTCODE").toString()));
                    temp.put("finishflag", false);
                } else {
                    temp.put("finishflag", true);
                }
                result.add(temp);
            }
        }
        return result;
    }

    private Boolean IfHasDeptChildNode(List<Map> list, String code) {
        for (int i = 0; i < list.size(); i++) {
            if (code.equals(list.get(i).get("V_DEPTCODE").toString())) {
                return true;
            }
        }
        return false;
    }

    public Map DeleteProcessInstance(String businesskey) {

        Map result = new HashMap();

        try {
            HistoricProcessInstance instance = historyService
                    .createHistoricProcessInstanceQuery()
                    .processInstanceBusinessKey(businesskey).listPage(0, 1)
                    .get(0);

            ProcessInstance processInstance = runtimeService
                    .createProcessInstanceQuery().processInstanceId(instance.getId())
                    .singleResult();

            if (processInstance == null) {
                logger.error("实例未找到:" + instance.getId());
                result.put("msg", "未找到流程实例");
            } else {
                List<HistoricTaskInstance> historyTasks = historyService
                        .createHistoricTaskInstanceQuery()
                        .processInstanceId(instance.getId()).list();

                for (HistoricTaskInstance historicTaskInstance : historyTasks) {
                    historyService.deleteHistoricTaskInstance(historicTaskInstance
                            .getId());
                }

                runtimeService.deleteProcessInstance(instance.getId(), null);
                result.put("msg", "删除成功");
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return result;
    }

}
