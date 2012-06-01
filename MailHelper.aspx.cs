using System;
using System.Text;
using System.Web;
using System.IO;
using System.Net.Mail;
using System.Web.Configuration;

public partial class MailTester : System.Web.UI.Page
{
    string _name = string.Empty;
    string _email = string.Empty;
    string _phone = string.Empty;
    string _zip = string.Empty;
    string _message = string.Empty;

    # region General Properties
    public string SMTPServer
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["SMTPServer"]) ? string.Empty : WebConfigurationManager.AppSettings["SMTPServer"].ToString();
        }
    }
    public string LogFile
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["LogFile"]) ? string.Empty : WebConfigurationManager.AppSettings["LogFile"].ToString();
        }
    }

    # endregion

    # region Email related appsetting retrieval
    public string EmailFrom
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["EmailFrom"]) ? string.Empty : WebConfigurationManager.AppSettings["EmailFrom"].ToString();
        }
    }
    public string EmailTo
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["EmailTo"]) ? string.Empty : WebConfigurationManager.AppSettings["EmailTo"].ToString();
        }
    }
    public string EmailSubject
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["EmailSubject"]) ? string.Empty : WebConfigurationManager.AppSettings["EmailSubject"].ToString();
        }
    }
    public string EmailBody
    {
        get
        {
            return string.IsNullOrEmpty(WebConfigurationManager.AppSettings["EmailBody"]) ? string.Empty : WebConfigurationManager.AppSettings["EmailBody"].ToString();
        }
    }
    # endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "text/plain";
        Response.ContentEncoding = System.Text.UTF8Encoding.ASCII;

        System.Collections.Specialized.NameValueCollection postdata = Request.Form;
        
        if (!string.IsNullOrEmpty(postdata["name"]))
            _name = postdata["name"];
        if (!string.IsNullOrEmpty(postdata["email"]))
            _email = postdata["email"];
        if (!string.IsNullOrEmpty(postdata["phone"]))
            _phone = postdata["phone"];
        if (!string.IsNullOrEmpty(postdata["zip"]))
            _zip = postdata["zip"];
        if (!string.IsNullOrEmpty(postdata["message"]))
            _message = postdata["message"];

        MailMessage message = new MailMessage();
        message.From = new MailAddress((string.IsNullOrEmpty(_email)) ? this.EmailFrom : _email);
        message.To.Add(new MailAddress(this.EmailTo));
        message.Subject = this.EmailSubject + _name;

        StringBuilder sb = new StringBuilder();
        sb.AppendLine(_name + this.EmailBody);
        sb.AppendLine(string.Empty);
        sb.AppendLine("Name: " + _name);
        sb.AppendLine("Email: " + _email);
        sb.AppendLine("Phone: " + _phone);
        sb.AppendLine("Zip: " + _zip);
        sb.AppendLine("Message: " + _message);

        message.Body = sb.ToString();

        try
        {
            SmtpClient client = new SmtpClient();
            client.Send(message);
            Response.Write("Succeeded");
        }
        catch (Exception ex)
        {
            if (!string.IsNullOrEmpty(this.LogFile))
            {
                string logFile = Path.Combine(Server.MapPath("~/logs") , this.LogFile);
                
                if (File.Exists(logFile))
                {
                    using (StreamWriter file = new StreamWriter(logFile))
                    {
                        file.WriteLine("Exception occured when sending email (" + DateTime.Now + ")");
                        file.WriteLine("InnerException:" + ex.InnerException);
                        file.WriteLine("Message:" + ex.Message);

                        file.Close();
                    }
                }
            }

            Response.Write("Failed");
        }
    }
}