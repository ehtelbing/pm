package org.building.pm.test;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 单元测试的基类(需要数据库的连接）
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:/spring-mvc.xml"})
public class TestBaseWithDataSource extends AbstractTransactionalJUnit4SpringContextTests {

    /*
    @Override
    @Resource(name = "myDataSource")
    public void setDataSource(DataSource dataSource) {
        super.setDataSource(dataSource);
    }
    */
}
