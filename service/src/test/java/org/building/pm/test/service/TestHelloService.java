package org.building.pm.test.service;

import org.building.pm.service.HelloService;
import org.building.pm.test.TestBaseWithoutDataSource;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * HelloService的测试用例
 */

public class TestHelloService extends TestBaseWithoutDataSource {

    @Autowired
    private HelloService helloService;

    @Test
    public void testGetCopyright(){
        String copyright = helloService.getCopyright();
        Assert.assertEquals("NewAngel",copyright);
    }

}
