package org.building.pm.Entity;

public class AssigneeEntity {

    private String user;//用户变量

    /*
     * 审批变量
     * */
    private String fqrxg;//发起人修改
    private String sbzrsp;//设备主任审批
    private String qygcssp;//区域工程师审批
    private String zrgcssp;//主任工程师审批
    private String zgkzsp;//主管科长审批
    private String sbbzsp;//设备部长审批
    private String sbcz;//设备厂长
    private String tjysp;//统计员审批
    private String lcjs;//流程结束

    /*
     * 工单变量
     * */
    private String gddy;//工单打印
    private String gdjs;//工单接收
    private String gdfk;//工单反馈
    private String gdys;//工单验收
    private String gddyjs;//工单打印接收

    /*
     * 精密点检变量
     * */

    private String ckjmdjzgjs;//厂矿精密点检主管接收
    private String gssbbfzrsp;//公司设备部负责人审批
    private String gssbbzgsp;//公司设备部主管审批
    private String jmdjsqs;//精密点检室签收
    private String ckjmdjzgxg;//厂矿精密点检主管修改

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getFqrxg() {
        return fqrxg;
    }

    public void setFqrxg(String fqrxg) {
        this.fqrxg = fqrxg;
    }

    public String getSbzrsp() {
        return sbzrsp;
    }

    public void setSbzrsp(String sbzrsp) {
        this.sbzrsp = sbzrsp;
    }

    public String getQygcssp() {
        return qygcssp;
    }

    public void setQygcssp(String qygcssp) {
        this.qygcssp = qygcssp;
    }

    public String getZrgcssp() {
        return zrgcssp;
    }

    public void setZrgcssp(String zrgcssp) {
        this.zrgcssp = zrgcssp;
    }

    public String getZgkzsp() {
        return zgkzsp;
    }

    public void setZgkzsp(String zgkzsp) {
        this.zgkzsp = zgkzsp;
    }

    public String getSbbzsp() {
        return sbbzsp;
    }

    public void setSbbzsp(String sbbzsp) {
        this.sbbzsp = sbbzsp;
    }

    public String getSbcz() {
        return sbcz;
    }

    public void setSbcz(String sbcz) {
        this.sbcz = sbcz;
    }

    public String getTjysp() {
        return tjysp;
    }

    public void setTjysp(String tjysp) {
        this.tjysp = tjysp;
    }

    public String getLcjs() {
        return lcjs;
    }

    public void setLcjs(String lcjs) {
        this.lcjs = lcjs;
    }

    public String getGddy() {
        return gddy;
    }

    public void setGddy(String gddy) {
        this.gddy = gddy;
    }

    public String getGdjs() {
        return gdjs;
    }

    public void setGdjs(String gdjs) {
        this.gdjs = gdjs;
    }

    public String getGdfk() {
        return gdfk;
    }

    public void setGdfk(String gdfk) {
        this.gdfk = gdfk;
    }

    public String getGdys() {
        return gdys;
    }

    public void setGdys(String gdys) {
        this.gdys = gdys;
    }

    public String getGddyjs() {
        return gddyjs;
    }

    public void setGddyjs(String gddyjs) {
        this.gddyjs = gddyjs;
    }

    public String getCkjmdjzgjs() {
        return ckjmdjzgjs;
    }

    public void setCkjmdjzgjs(String ckjmdjzgjs) {
        this.ckjmdjzgjs = ckjmdjzgjs;
    }

    public String getGssbbfzrsp() {
        return gssbbfzrsp;
    }

    public void setGssbbfzrsp(String gssbbfzrsp) {
        this.gssbbfzrsp = gssbbfzrsp;
    }

    public String getGssbbzgsp() {
        return gssbbzgsp;
    }

    public void setGssbbzgsp(String gssbbzgsp) {
        this.gssbbzgsp = gssbbzgsp;
    }

    public String getJmdjsqs() {
        return jmdjsqs;
    }

    public void setJmdjsqs(String jmdjsqs) {
        this.jmdjsqs = jmdjsqs;
    }

    public String getCkjmdjzgxg() {
        return ckjmdjzgxg;
    }

    public void setCkjmdjzgxg(String ckjmdjzgxg) {
        this.ckjmdjzgxg = ckjmdjzgxg;
    }
}
