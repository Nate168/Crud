using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace AI.Internal.Web
{
    public class DotNetHelper
    {
        public static void Reset()
        {
            AI.Common.AIMaster.Reset();
        }

        public static string Mode()
        {
            return AI.Common.AIMaster.Mode.ToString();
        }

        public static string Version()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            return fvi.FileVersion;
        }

        public static string CurrentUser(HttpContext Context)
        {
            return HttpUtility.JavaScriptStringEncode(Context.User.Identity.Name);
        }

        public static string AIMasterRestApi()
        {
            return AI.Common.AIMaster.GetConfigValue("AIInternal_AIMaster_RESTAPI");
        }
    }
}