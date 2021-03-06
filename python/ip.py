from asyncio import events
import time
import datetime
import requests
import json
from requests import get
from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify
app = Flask(__name__)

CORS(app)


@app.route('/', methods=['GET'])
def get_tasks():
    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        return {'ip': request.environ['REMOTE_ADDR']}
    else:
        return {'ip': request.environ['HTTP_X_FORWARDED_FOR']}


@app.route("/ip")
# private=socket.gethostbyname(socket.gethostname())
# adr="185.185.179.8"
def ip_info():
    ip = {}
    adrr = get_tasks()
    adr = adrr['ip']

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


@app.route("/as")
def asn_info():
    asn = "42020"
    dictionary = {}
    sous_dictionnaire = {}
    dictionnaire = {}
    # sourceasn="https://stat.ripe.net/data/country-resource-list/data.json?resource=LB"
    # responseasn = requests.get(sourceasn).json()
    # ASN=responseasn["data"]["resources"]["asn"]

    # for asn in ASN:
    source = "https://stat.ripe.net/data/visibility/data.json?include=peers_seeing&resource="+asn
    source2 = "https://stat.ripe.net/data/routing-status/data.json?resource="+asn
    source3 = "https://stat.ripe.net/data/whois/data.json?resource="+asn
    source1 = 'https://ihr.iijlab.net/ihr/api/networks/?number='+asn

    # nb of prefixes for each autonomous system
    url = "https://stat.ripe.net/data/routing-status/data.json?resource="+asn
    response1 = requests.get(url).json()
    nb_prefix = response1["data"]["announced_space"]
    nb = response1["data"]["announced_space"]["v4"]["prefixes"] + \
        response1["data"]["announced_space"]["v6"]["prefixes"]
    print(nb)
    sous_dictionnaire["Number of prefixes"] = nb
    sous_dictionnaire["v4"] = response1["data"]["announced_space"]["v4"]["prefixes"]
    sous_dictionnaire["v6"] = response1["data"]["announced_space"]["v6"]["prefixes"]

    # list of prefixes for an as
    list_prefixe = "https://stat.ripe.net/data/announced-prefixes/data.json?resource="+asn
    lists = requests.get(list_prefixe).json()
    j = 0
    for i in lists["data"]["prefixes"]:
        prefix = i["prefix"]
        print(prefix)
        dictionnaire[j] = prefix
        j = j+1
    sous_dictionnaire["List of prefixes"] = dictionnaire
    ipv4_seeing = 0
    ipv4_total = 0
    ipv6_seeing = 0
    ipv6_total = 0
    response1 = requests.get(source2).json()
    response2 = requests.get(source3).json()
    response3 = requests.get(source1).json()

    print("Time:")
    time = response1["data"]["last_seen"]["time"]
    sous_dictionnaire["time"] = time
    print(time)

    name = response2["data"]["records"][0][1]["value"]
    print("ASN name:"+name)
    print(response1["data"]["visibility"])
    sous_dictionnaire["name"] = name
    print(name)

    disco = response3["results"][0]["disco"]
    print("Disconnection:"+str(disco))
    sous_dictionnaire["disconnection"] = disco

    for i in response1:
        ipv4_seeing = response1["data"]["visibility"]["v4"]["ris_peers_seeing"]
        ipv4_total = response1["data"]["visibility"]["v4"]["total_ris_peers"]
    if (ipv4_seeing == ipv4_total):
        sous_dictionnaire["ipv4"] = 100
        print("100% visibility ipv4")
    else:
        per = (ipv4_seeing*100)/ipv4_total
        sous_dictionnaire["ipv4"] = per
        print(str(per)+"% Visibility ipv4")

    for i in response1:
        ipv6_seeing = response1["data"]["visibility"]["v6"]["ris_peers_seeing"]
        ipv6_total = response1["data"]["visibility"]["v6"]["total_ris_peers"]
    if (ipv6_seeing == ipv6_total):
        sous_dictionnaire["ipv6"] = 100
        print("100% visibility ipv6")
    else:
        per = (ipv6_seeing*100)/ipv6_total
        sous_dictionnaire["ipv6"] = per
        print(str(per)+"% Visibility ipv6")

    dictionary[asn] = sous_dictionnaire
    with open("sample.json", "w") as outfile:
        json.dump(dictionary, outfile, indent=4)

    return dictionary


@app.route("/history")
def History(asn):
    history = {}
    sous_hist = {}
    sous_dict = {}
    url = "https://stat.ripe.net/data/routing-history/data.json?min_peers=0&resource="+asn
    hist = requests.get(url).json()
    comp = 0
    j = 0
    list = []
    with open(r'C:\Users\Lea\Desktop\MDP\RealTimeMonitor\RealTimeInternetMonitor\python\ip.json', 'r') as f:
        data = json.load(f)
    pref = data["prefix"]
    for p in hist["data"]["by_origin"][0]["prefixes"]:
        list.append(p["prefix"])
    for l in list:
        if l == pref:
            for d in p["timelines"]:
                print(p["timelines"])
                sous_dict[l] = d
    hist[p["prefix"]] = sous_dict
    # for p in hist["data"]["by_origin"][0]["prefixes"]:
    #     # print(p[0])
    #     pref = p["prefix"]
    #     print(pref)
    #     history[pref] = " "
    #     for pref in p:
    #         # print(d)
    #         date = "2022"
    #         for d in p["timelines"]:
    #             if date in p["timelines"]:
    #                 # print(d["starttime"])
    #                 comp = comp+1
    #                 # print(d)
    #                 sous_hist[pref] = d
    #                 # j = j+1
    #     # sous_dict[""] = sous_hist
    #     history[pref] = sous_hist

    with open("history.json", "w") as outfile:
        json.dump(history, outfile)

    return history


# def event():
##    dict = {}
##
##    previous_date = datetime.datetime.today() - datetime.timedelta(days=1)
##    times = str(int(round(previous_date.timestamp())))
##
##    curr_date = datetime.datetime.now()
##    times1 = str(int(round(curr_date.timestamp())))
##
# url = 'https://ioda.caida.org/ioda/data/events?from=' + \
# times+'&until='+times1+'&human=true&meta=country/LB'
##    events = requests.get(url).json()
##
##    start_time = events["queryParameters"]["from"]
##    end_time = events["queryParameters"]["until"]
##
##    timestamp = datetime.datetime.fromtimestamp(int(start_time))
##    start = timestamp.strftime('%Y-%m-%d %H:%M:%S')
##
##    timestamp1 = datetime.datetime.fromtimestamp(int(end_time))
##    end = timestamp1.strftime('%Y-%m-%d %H:%M:%S')
##
##    print("Events occured:")
##    list_events = events["data"]["events"]
# print(list_events)
##    dict["Events"] = list_events
##
# print("Country:")
##    place = events["queryParameters"]["meta"]
# print(place)
##    dict["Country"] = place
##
##    print("Start time:")
# print(start)
##    dict["Start-time"] = start
##    print("End time:")
# print(end)
##    dict["End-time"] = end
##
# with open("events.json", "w") as outfile:
##        json.dump(dict, outfile)
##
##
# def alert():
##    dict = {}
##
##    curr_date = datetime.datetime.now()
# print(curr_date)
##    timestamp = str(int(round(curr_date.timestamp())))
# print(timestamp)
##
# url = 'https://ioda.caida.org/ioda/data/alerts?from='+timestamp + \
# '&until='+timestamp+'&annotateMeta=true&human=true&meta=country/LB'
##    alerts = requests.get(url).json()
##
##    start_time = alerts["queryParameters"]["from"]
##    end_time = alerts["queryParameters"]["until"]
##
##    timestamp1 = datetime.datetime.fromtimestamp(int(start_time))
##    start = timestamp1.strftime('%Y-%m-%d %H:%M:%S')
##
##    timestamp2 = datetime.datetime.fromtimestamp(int(end_time))
##    end = timestamp2.strftime('%Y-%m-%d %H:%M:%S')
##
# print("Alerts:")
##    list_alerts = alerts["data"]["alerts"]
# print(list_alerts)
##    dict["Alerts"] = list_alerts
##
##    print("Start time:")
# print(start)
##    dict["Start-time"] = start
##    print("End time:")
# print(end)
##    dict["End-time"] = end
##
# with open("alerts.json", "w") as outfile:
##        json.dump(dict, outfile)
##
##
# event()
# alert()


if __name__ == "__main__":
    app.run(debug=True)
    History("42020")
