import requests
import json
from requests import get
from flask import Flask

app=Flask(__name__)
@app.route("/ip")


# private=socket.gethostbyname(socket.gethostname())
# adr="185.185.179.8"


def ip_info():
    ip = {}
    adr = get('https://api.ipify.org').text

    sourceip = "https://stat.ripe.net/data/whois/data.json?resource="+adr+"%2F24"
    sourcevisib = "https://stat.ripe.net/data/routing-status/data.json?resource="+adr+"%2F24"

    responseip = requests.get(sourceip).json()
    visible = requests.get(sourcevisib).json()

    prefix = responseip["data"]["records"][0][0]["value"]
    ip["prefix"] = prefix

    rpki = "https://stat.ripe.net/data/rpki-validation/data.json?resource=38999&prefix="+prefix
    pk = requests.get(rpki).json()
    isp = responseip["data"]["records"][0][1]["value"]
    ip["isp"] = isp
    country = responseip["data"]["records"][0][2]["value"]
    ip["country"] = country
    ipp = responseip["data"]["irr_records"][0][0]["value"]
    ip["ip"] = ipp
    asn_name = responseip["data"]["irr_records"][0][2]["value"]
    ip["asnname"] = asn_name
    asn_code = responseip["data"]["irr_records"][0][1]["value"]
    ip["asncode"] = asn_code

    try:
        rpk = pk["data"]["validating_roas"]["validity"]
        ip["rpki"] = rpk
    except:
        ip["rpki"] = "Not valid"

    ipv4_seeing = visible["data"]["visibility"]["v4"]["ris_peers_seeing"]
    ipv4_total = visible["data"]["visibility"]["v4"]["total_ris_peers"]

    if (ipv4_seeing == ipv4_total):
        ip["ipv4"] = 100
        print("100% visibility ipv4")
    else:
        per = (ipv4_seeing*100)/ipv4_total
        ip["ipv4"] = per
        print(str(per)+"% Visibility ipv4")

    ipv6_seeing = visible["data"]["visibility"]["v6"]["ris_peers_seeing"]
    ipv6_total = visible["data"]["visibility"]["v6"]["total_ris_peers"]

    if (ipv6_seeing == ipv6_total):
        ip["ipv6"] = 100
        print("100% visibility ipv6")
    else:
        per = (ipv6_seeing*100)/ipv6_total
        ip["ipv6"] = per
        print(str(per)+"% Visibility ipv6")

    with open("ip.json", "w") as outfile:
        json.dump(ip, outfile)

    return ip

if __name__=="__main__":
    app.run(debug=True)
