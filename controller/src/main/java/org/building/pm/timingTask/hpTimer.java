package org.building.pm.timingTask;

import org.building.pm.service.hpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;

import java.sql.SQLException;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by hpnn on 2017/12/5.
 */
@Component
public class hpTimer {
    @Value("#{configProperties['PM_JST']}")
    private String pm_jst;

    @Autowired
    private hpService hpService;

    //查询有没有新的发起工单数据,有的话往AM_SEND里SET
    @Scheduled(cron = "0 0/1 * * * ?")//这是定时时间的地方
    public void setJstWherePlantime(){
        try {
            HashMap data = hpService.PM_06_DJ_CRITERION_DSDATA_SEL();

            List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");
            SimpleDateFormat sdftime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Format f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            for (int i = 0; i < dataList.size(); i++) {
                Double zhouqi = (Double) dataList.get(i).get("V_CRITERION_CYCLE");
                String shengchengSJ = (String) dataList.get(i).get("V_PLAN_TIME");
                String scTime = shengchengSJ.substring(0, 10) + " 00:00:00";
                String intNumberzhouqi = String.valueOf(zhouqi);
                String intNumber = intNumberzhouqi.substring(0, intNumberzhouqi.indexOf("."));
                int index = intNumberzhouqi.lastIndexOf(".");
                char[] ch = intNumberzhouqi.toCharArray();
                String lastString = String.copyValueOf(ch, index + 1, ch.length - index - 1);
                String lastString2 = "0." + lastString;
                Double d = Double.valueOf(lastString2);
                Calendar ca = Calendar.getInstance();
                ca.setTime(sdftime.parse(scTime));
                ca.add(Calendar.HOUR_OF_DAY, Integer.parseInt(intNumber));
                ca.add(Calendar.MINUTE, (int) (d * 60));
                System.out.println("第" + i + "个最终时间时间为" + sdftime.format(ca.getTime()));
                System.out.println("第" + i + "个当前时间时间为" + sdftime.format(new Date()));
                String date1 = sdftime.format(ca.getTime());
                String date2 = sdftime.format(new Date());
                if (date1.equals(date2)) {
                    HashMap dataSet = hpService.PM_06_DJ_CRITERION_JST_SET(pm_jst, "发送人即时通密码", "发送人即时通账号", (String) dataList.get(i).get("V_FZ_PER"), "日常点检", (String) dataList.get(i).get("V_CRITERION_CONTENT"), 0, date2);
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    //查询有没有新的发起工单数据,有的话往AM_SEND里SET
    @Scheduled(cron = "0 0/1 * * * ?")//这是定时时间的地方
    public void setDJDB(){
        try {
            HashMap data = hpService.PM_06_DJ_CRITERION_DSDATA_SEL();

            List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");
            SimpleDateFormat sdftime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Format f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            String v_v_timer_guid = String.valueOf(UUID.randomUUID());
           // System.out.println("此时的ID为 : " + v_v_timer_guid);


            for (int i = 0; i < dataList.size(); i++) {
                Double zhouqi = (Double) dataList.get(i).get("V_CRITERION_CYCLE");
                String shengchengSJ = (String) dataList.get(i).get("V_PLAN_TIME");
                String scTime = shengchengSJ.substring(0, 10) + " 00:00:00";
                String intNumberzhouqi = String.valueOf(zhouqi);
                String intNumber = intNumberzhouqi.substring(0, intNumberzhouqi.indexOf("."));
                int index = intNumberzhouqi.lastIndexOf(".");
                char[] ch = intNumberzhouqi.toCharArray();
                String lastString = String.copyValueOf(ch, index + 1, ch.length - index - 1);
                String lastString2 = "0." + lastString;
                Double d = Double.valueOf(lastString2);
                Calendar ca = Calendar.getInstance();
                ca.setTime(sdftime.parse(scTime));
                ca.add(Calendar.HOUR_OF_DAY, Integer.parseInt(intNumber));
                ca.add(Calendar.MINUTE, (int) (d * 60));
                //System.out.println("第" + i + "个最终时间时间为" + sdftime.format(ca.getTime()));
               // System.out.println("第" + i + "个当前时间时间为" + sdftime.format(new Date()));
                String date1 = sdftime.format(ca.getTime());
                String date2 = sdftime.format(new Date());
                if (date1.equals(date2)) {
                   // HashMap dataSet = hpService.PM_06_DJ_CRITERION_JST_SET(pm_jst, "发送人即时通密码", "发送人即时通账号", (String) dataList.get(i).get("V_PLAN_PER"), "日常点检", (String) dataList.get(i).get("V_CRITERION_CONTENT"), 0, date2);
                    HashMap dataSet = hpService.PM_06_DJ_DATA_TIMER_SET((String) dataList.get(i).get("V_GUID"),v_v_timer_guid,(String) dataList.get(i).get("V_FZ_PER"),(String) dataList.get(i).get("V_DJ_TYPE"));
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    //查询AM_SEND有没有新数据有的话调用即时通
    @Scheduled(cron = "0 0/5 * * * ?")//这是定时时间的地方
    public void sendJstWithNew(){
        try {
            HashMap data = hpService.PM_AM_SEND_SEL();

            List<Map<String, Object>> dataList = (List<Map<String, Object>>) data.get("list");

            if (dataList != null) {
                for (int i = 0; i < dataList.size(); i++) {
                    Double I_I_FINISH = (Double) dataList.get(i).get("I_FINISH");
                    String state = String.valueOf(I_I_FINISH);
                    if (state.equals("0.0")) {
                        String V_V_SEND_PERSON = (String) dataList.get(i).get("V_SEND_PERSON");
                        String ret = hpService.AMToMessIFCheck("<SendMessage><AM_Name>" + V_V_SEND_PERSON + "</AM_Name><UserId></UserId><Type>即时通</Type><Access></Access><EMail></EMail><IsBack></IsBack><IsEncrypt></IsEncrypt><ISPriority></ISPriority><Ohter1></Ohter1><Ohter2></Ohter2><PhoneNum></PhoneNum><MessageTxt></MessageTxt><SystemName>AKSB</SystemName></SendMessage>", "http://localhost:8081/pm/app/pm/page/login/login.html");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
