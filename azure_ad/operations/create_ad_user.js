log.trace("Started executing 'fb-cloud:azure:operation:create_ad_user.js' flintbit")

log.trace("Inputs for 'fb-cloud:azure:operation:create_ad_user.js' :: " + input)
action = "aad-create-user"
connector_name = "msazure"

// Input clone
input_clone = JSON.parse(input)

// Initializaing vars
client_id = ""
tenant_id = ""
key = ""
subscription_id = ""
ms_azure_parameters = ""

// Check if service params for Azure exist
if (input_clone.hasOwnProperty('ms_azure_parameters')) {
    ms_azure_parameters = input.get('ms_azure_parameters')

    // Client ID
    if (!input_clone.hasOwnProperty('client_id')) {
        client_id = ms_azure_parameters.get('client_id')
        log.trace("Client ID taken from service parameters")
    }

    // Tenant ID
    if (!input_clone.hasOwnProperty('tenant_id')) {
        tenant_id = ms_azure_parameters.get('tenant_id')
        log.trace("Tenant ID taken from service parameters")
    }

    // Key
    if (!input_clone.hasOwnProperty('key')) {
        key = ms_azure_parameters.get('key')
        log.trace("Key taken from service parameters")
    }

    // Subscription ID
    if (!input_clone.hasOwnProperty('subscription_id')) {
        subscription_id = ms_azure_parameters.get('subscription_id')
        log.trace("Subscription ID taken from service parameters")
    }
} else {
    log.info("Optional azure service parameters are not present")

    client_id = input.get('client_id')
    log.trace("Client ID: "+client_id)
    tenant_id = input.get('tenant_id')
    log.trace("Tenant ID is given")
    key = input.get('key')
    log.trace("Key is given")
    subscription_id = input.get('subscription_id')
    log.trace("Subscription ID: "+subscription_id)

}

// Mandatory new user parameters
account_enabled = false 
display_name = ""
mail_nickname = ""
password = ""
force_password_change = true
user_principal_name = ""


// Account Enabled?
if(input_clone.hasOwnProperty('account_enabled')){
    account_enabled = input.get('account_enabled')
    if( account_enabled!= null &&  account_enabled!= ""){
        log.trace("Account Enabled? "+account_enabled)
    }
}

// Display Name
if(input_clone.hasOwnProperty('display_name')){
    display_name = input.get('display_name')
    if( display_name!= null &&  display_name!= ""){
        log.trace("Display name is "+display_name)
    }
}

// Mail Nickname
if(input_clone.hasOwnProperty('mail_nickname')){
    mail_nickname = input.get('mail_nickname')
   if( mail_nickname!= null && mail_nickname != ''){
       log.trace("Mail nickname is "+mail_nickname)
   }
}

// Password
if(input_clone.hasOwnProperty('password')){
    password = input.get('password')
    if( password!= null &&  password!= ''){
       log.trace("Password is given")
   }
}

// Force password change on login
if(input_clone.hasOwnProperty('force_password_change')){
    force_password_change = input.get('force_password_change')
   if( force_password_change!= null &&  force_password_change!= ""){
       log.trace("Force password change on login? "+force_password_change)
   }
}

// User Principal Name
if(input_clone.hasOwnProperty('user_principal_name')){
    user_principal_name = input.get('user_principal_name')
    if( user_principal_name!= null &&  user_principal_name!= ""){
        log.trace("User Principal name is "+user_principal_name)
    }
}

// Azure AD Domain
if(input_clone.hasOwnProperty('active_directory_domain')){
    active_directory_domain = input.get('active_directory_domain')
    if( active_directory_domain!= null &&  active_directory_domain!= ""){
        log.trace("Azure AD domain is "+active_directory_domain)
    }
}

log.trace("Calling MS Azure connector for action: " + action)
connector_call = call.connector(connector_name)
    .set('action', action)
    .set('client-id', client_id)
    .set('tenant-id', tenant_id)
    .set('key', key)
    .set('subscription-id', subscription_id)
    .set('accountEnabled', account_enabled)
    .set('displayName', display_name)
    .set('mailNickname', mail_nickname)
    .set('password', password)
    .set('forceChangePasswordNextLogin', force_password_change)
    .set('userPrincipalName', user_principal_name)
    .set('active_directory_domain', active_directory_domain)
    .set('azureAd', '')
    .timeout(120000)

// Optional parameters
// Department
if(input_clone.hasOwnProperty('department')){
    department = input.get('department')
    log.trace("Department is "+department)
    connector_call.set('department', department)

}
// Given Name - First Name
if(input_clone.hasOwnProperty('given_name')){
    given_name = input.get('given_name')
    log.trace("Given name/ first name is "+given_name)
    connector_call.set('givenName', given_name)

}
// Job Title
if(input_clone.hasOwnProperty('job_title')){
    job_title = input.get('job_title')
    log.trace("Job title is "+job_title)
    connector_call.set('jobTitle', job_title)

}
// Mobile
if(input_clone.hasOwnProperty('mobile')){
    mobile = input.get('mobile')
    log.trace("Mobile is "+mobile)
    connector_call.set('mobile', mobile)

}
// Other mails
if(input_clone.hasOwnProperty('other_mails')){
    other_mails = input.get('other_mails')
    log.trace("Other mails is "+other_mails)
    connector_call.set('otherMails', other_mails)

}
// Password Policies
if(input_clone.hasOwnProperty('password_policies')){
    password_policies = input.get('password_policies')
    log.trace("Password policy is "+password_policies)
    connector_call.set('passwordPolicies', password_policies)

}
// Physical Delivery Office Name
if(input_clone.hasOwnProperty('physical_delivery_office_name')){
    physical_delivery_office_name = input.get('physical_delivery_office_name')
    log.trace("Physical Delivery Office Name is "+physical_delivery_office_name)
    connector_call.set('physicalDeliveryOfficeName', physical_delivery_office_name)

}
// Preferred Language
if(input_clone.hasOwnProperty('preferred_language')){
    preferred_language = input.get('preferred_language')
    log.trace("Preferred Language is "+preferred_language)
    connector_call.set('preferredLanguage', preferred_language)

}
// Street Address
if(input_clone.hasOwnProperty('street_address')){
    street_address = input.get('street_address')
    log.trace("Street address is "+street_address)
    connector_call.set('streetAddress', street_address)

}
// Postal Code
if(input_clone.hasOwnProperty('postal_code')){
    postal_code = input.get('postal_code')
    log.trace("Postal code is "+postal_code)
    connector_call.set('postalCode', postal_code)

}
// On Premises Security Identifier
if(input_clone.hasOwnProperty('on_premise_security_identifier')){
    on_premise_security_identifier = input.get('on_premise_security_identifier')
    log.trace("On Premises Security Identifier is "+on_premise_security_identifier)
    connector_call.set('onPremisesSecurityIdentifier', on_premise_security_identifier)

}
// Object Type
if(input_clone.hasOwnProperty('object_type')){
    object_type = input.get('object_type')
    log.trace("Object type is "+object_type)
    connector_call.set('objectType', object_type)

}
// Surname
if(input_clone.hasOwnProperty('surname')){
    surname = input.get('surname')
    log.trace("Surname is "+surname)
    connector_call.set('surname', surname)

}
// Email
if(input_clone.hasOwnProperty('Email')){
    email = input.get('Email')
    log.trace("Email is "+email)
    connector_call.set('Email', email)

}

log.info("Connector request generated. Making connector call.")
connector_call_response = connector_call.sync()


exit_code = connector_call_response.exitcode()
message = connector_call_response.message()

log.trace("New Azure AD User creation response: " + connector_call_response)

if (exit_code == 0) {
    log.trace("Exitcode is " + exit_code)
    message = JSON.parse(message)
    log.trace("Message: "+message)
    output.set('result', message)

} else {
    log.trace("Error: " + message)
    output.set('error', message)
}

log.trace("Finsihed executing 'fb-cloud:azure:operation:create_ad_user.js' flintbit")
