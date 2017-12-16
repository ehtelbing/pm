package org.building.pm.test;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created: Mars
 * Date: 12/22/16
 * Copyright: 鞍山市新安杰系统集成有限公司
 * Describe: 单元测试的基类(没有数据库的连接）
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:/spring-mvc.xml",
        "classpath:/spring/pm-module-service.xml"})
public class TestBaseWithoutDataSource extends AbstractJUnit4SpringContextTests {
}
