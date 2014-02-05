package com.hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HelloWorldController {

    @RequestMapping(value = "welcome",method = RequestMethod.GET)
	public String helloWorld(ModelMap model) {

        model.addAttribute("message", "Spring 3 MVC Hello World");
        return "hello";
    }

    @RequestMapping(value = "shop",method = RequestMethod.GET)
    public String goToShop(ModelMap model) {

        model.addAttribute("message", "Spring 3 MVC Hello World");
        return "shop";
    }


}