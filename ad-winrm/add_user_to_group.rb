@log.trace("Started executing 'flint-util:ad-winrm:add_user_to_group.rb' flintbit...")
begin
    @member_login_name = @input.get('member-login-name')
    @group_name = @input.get('group-name')
    @command = "Add-ADGroupMember -Identity #{@group_name} -Members #{@member_login_name}"
    # Call flintbit synchronously and set arguments
    flintbit_response = @call.bit('flint-util:ad-winrm:winrm_commonconnect.rb')
                             .set('command', @command)
                             .sync

success_message = flintbit_response.message
result= flintbit_response.get("result")
@error_message= flintbit_response.get("error")

if flintbit_response.get("exit-code") == 0
@log.info("Success in executing WinRM Connector, where exitcode :: #{flintbit_response.get("exit-code")} | message :: #{success_message}")
    @log.info("Command executed :: #{@command} | Command execution results :: #{result}")
    @user_message = """**Account with username :'#{@login_name}' is added to Group #{@group_name} successfully**"""
    @log.info("Add user to a Group operation successful    ::user_message:: #{@user_message}")
    @output.set('result', result).set('user_message',@user_message)
    @log.trace("Finished executing 'winrm' flintbit with success...")
else
    @log.error("Failure in executing WinRM Connector where, exitcode :: #{flintbit_response.get("exit-code")} | message :: #{@error_message}")
    @log.error("Add user to a Group operation unsuccessful")
    #@new_error = @error_message[/[^\d]+/]
    #@error_msg = @new_error.gsub(/^At line\:/, '')
    #@error_msgs = @error_msg.gsub(/\'/,'')
    #@user_message = """**Error:#{@error_msgs}**"""
    @a = @error_message.split(/At line/).first
    @user_message = """**Error:**
#{@a.rstrip}"""
    @log.error("Failure in executing WinRM Connector where, exitcode :: #{flintbit_response.get("exit-code")} | message :: #{@error_message} | for user :: #{@user_message}")
    @output.set('error', @error_message).set('user_message',@user_message)
    @log.trace("Finished executing 'winrm' flintbit with error...")
end
rescue => e
    @log.error(e.message)
    @user_message = """**Failed to add user to a Group !** """
    @output.set('message', e.message).set('exit-code', -1).set('user_message',@user_message)
    @log.info('output in exception')
    @output.exit(1,e.message)
end
@log.trace("Finished executing 'flint-util:ad-winrm:add_user_to_group.rb' flintbit")
