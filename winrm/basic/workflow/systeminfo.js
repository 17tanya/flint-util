/**
 * Creation Date: 15/05/2019
 * Summary: Find System information on target
 * Description: Find System information on target using WinRM Protocol
*/

log.trace("Started executing 'flint-util:winrm:basic:workflow:systeminfo.js'");

//command to find the system information
command = "systeminfo";
input_clone = JSON.parse(input);
operation_timeout = 80;

//Validation of Connector Name
if(input_clone.hasOwnProperty("connector_name")){
    connector_name = input.get("connector_name");      //Name of the WinRM Connector
    if(connector_name!=null || connector_name!=""){
        connector_call = call.connector(connector_name);
        log.info("Connector Name: "+connector_name);
    }
    else{
        log.error("Connector name is null or empty string");
    }
}
else{
    log.error("Connector key not given");          //Connector name is mandatory
}

//Validation of Target
if(input_clone.hasOwnProperty("target")){
    target = input.get("target"); //Target machine where command will be executed
    if(target!=null || target!=""){
        connector_call.set("target",target);
        log.info("target:"+target);
    }
    else{
        log.error("Target is null or empty string")
    }
}
else{
    log.error("target key not given");                  //Target is mandatory
}

//Validation of Username
if(input_clone.hasOwnProperty("username")){
    username = input.get("username");                   //Target Username
    if(username!=null || username!=""){
        connector_call.set("username",username);
        log.info("username:"+username);
    }
    else{
        log.error("Username is null or empty string")
    }
}
else{
    log.error("Username key not given");           //Username is mandatory
}

//Validation of timeout
if(input_clone.hasOwnProperty("timeout")){
    timeout = input.get("timeout");
    if(timeout!=null || timeout!=""){
        timeout = parseInt(timeout);
    }
    else{
        timeout = 60000;
        log.info("Setting timeout to 60000 miliseconds"); 
    }
    connector_call.set("timeout",timeout);
    log.info("timeout:"+timeout);
}
else{
    timeout = 60000;                               //timeout not mandatory
    log.info("Setting timeout to 60000 miliseconds");   //setting default timeout
}

//Validation of Port
if(input_clone.hasOwnProperty("port")){
    port = input.get("port");                           //Port to connect
    if(port!=null || port!=""){
        connector_call.set("port",port);
        log.info("port:"+port);
    }
    else{
        log.error("Port null or empty string")
    }
}
else{
    log.error("Port key not given");                //Port mandatory
}

//Validation of password
if(input_clone.hasOwnProperty("password")){
    password = input.get("password");                   //Target password
    if(password!=null || password!=""){
        connector_call.set("password",password);
        log.info("Password is given");
    }
    else{
        log.error("Password is null or an empty string")
    }
}
else{
    log.error("Password key not given");            //Password mandatory
}

//Validation of transport
if(input_clone.hasOwnProperty("authentication_type")){
    transport = input.get("authentication_type");       //Aunthentication and encryption type
    if(transport!=null || transport!=""){
        connector_call.set("transport",transport);
        log.info("Transport type:"+transport);
    }
    else{
        log.error("Transport type is null or empty string")
    }
}
else{
    log.error("Transport key not given");          //Transport mandatory
}

//Validation of shell
if(input_clone.hasOwnProperty("shell")){
    shell = input.get("shell");
    if(shell!=null || shell!=""){
        connector_call.set("shell",shell);
        log.info("shell:"+shell);
    }
    else{
        log.error("Shell type is null or empty string")
    }
}
else{
    log.error("shell key not given");                  //Type is mandatory
}

//connector call
response = connector_call.set("command",command)
                .set("operation_timeout",operation_timeout)
                .sync();

//WinRM Connector Response's meta parameters
response_exitcode = response.exitcode();        //Exit status code
response_message = response.message();          //Execution status message


user_message="";

//WinRM Connector Response's Result parameter
result = response.get("result");                //Response result
index_host = result.indexOf("Host Name");         //Extracting information
index_os = result.indexOf("OS Version");
index_prscr = result.indexOf("Processor(s)");
index_prscr_end = result.indexOf("Processor(s) Installed.");
index_tot_phy_mem = result.indexOf("Total Physical Memory");
index_page = result.indexOf("Page File Location(s)");

user_message = user_message + result.substring(index_host,index_os)+""+
                result.substring(index_prscr,index_prscr_end)+""+
                result.substring(index_tot_phy_mem,index_page)+"";
result_arr = user_message.split("\n");
result_arr.pop();

final_msg = "The details on host are:<br>";
for(i = 0 ; i<result_arr.length;i++){
    index = result_arr[i].indexOf("\r");
    result_arr[i] = result_arr[i].substring(0,index);
    final_msg = final_msg + "" +result_arr[i]+"<br>";
}

if(response_exitcode==0){                       //Successfull execution
    log.info("Successfull execution of command:"+command);
    log.info("Command result:"+final_msg);
    output.set("result",result_arr).set("exit-code",0).set("user_message",final_msg);
    log.trace("finished executing 'flint-util:winrm:basic:workflow:systeminfo.js' successfully")
}
else{
    log.error("Failure in execution, message:"+response_message+" | exitcode:"+response_exitcode);
    output.set("error",response_message).set("exit-code",-1);
    log.trace("finished executing 'flint-util:winrm:basic:workflow:systeminfo.js' with errors")
}