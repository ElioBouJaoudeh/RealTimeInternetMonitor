from asyncio import events
import requests
import json
from ripe.atlas.sagan import SslResult
import datetime
import time

# LIBANTELECOM
ASN1 = "42020"
# MTCTOUCH
ASN2 = "38999"


def asn_info(asn):
    dictionary = {}
    sous_dictionnaire = {}

    source = "https://stat.ripe.net/data/visibility/data.json?include=peers_seeing&resource="+asn
    source2 = "https://stat.ripe.net/data/routing-status/data.json?resource="+asn
    source3 = "https://stat.ripe.net/data/whois/data.json?resource="+asn
    source1 = 'https://ihr.iijlab.net/ihr/api/networks/?number='+asn

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
        json.dump(dictionary, outfile)


def event():
    dict = {}

    previous_date = datetime.datetime.today() - datetime.timedelta(days=1)
    times = str(int(round(previous_date.timestamp())))

    curr_date = datetime.datetime.now()
    times1 = str(int(round(curr_date.timestamp())))

    url = 'https://ioda.caida.org/ioda/data/events?from=' + \
        times+'&until='+times1+'&human=true&meta=country/LB'
    events = requests.get(url).json()

    start_time = events["queryParameters"]["from"]
    end_time = events["queryParameters"]["until"]

    timestamp = datetime.datetime.fromtimestamp(int(start_time))
    start = timestamp.strftime('%Y-%m-%d %H:%M:%S')

    timestamp1 = datetime.datetime.fromtimestamp(int(end_time))
    end = timestamp1.strftime('%Y-%m-%d %H:%M:%S')

    print("Events occured:")
    list_events = events["data"]["events"]
    print(list_events)
    dict["Events"] = list_events

    print("Country:")
    place = events["queryParameters"]["meta"]
    print(place)
    dict["Country"] = place

    print("Start time:")
    print(start)
    dict["Start-time"] = start
    print("End time:")
    print(end)
    dict["End-time"] = end

    with open("events.json", "w") as outfile:
        json.dump(dict, outfile)


def alert():
    dict = {}

    curr_date = datetime.datetime.now()
    # print(curr_date)
    timestamp = str(int(round(curr_date.timestamp())))
    # print(timestamp)

    url = 'https://ioda.caida.org/ioda/data/alerts?from='+timestamp + \
        '&until='+timestamp+'&annotateMeta=true&human=true&meta=country/LB'
    alerts = requests.get(url).json()

    start_time = alerts["queryParameters"]["from"]
    end_time = alerts["queryParameters"]["until"]

    timestamp1 = datetime.datetime.fromtimestamp(int(start_time))
    start = timestamp1.strftime('%Y-%m-%d %H:%M:%S')

    timestamp2 = datetime.datetime.fromtimestamp(int(end_time))
    end = timestamp2.strftime('%Y-%m-%d %H:%M:%S')

    print("Alerts:")
    list_alerts = alerts["data"]["alerts"]
    print(list_alerts)
    dict["Alerts"] = list_alerts

    print("Start time:")
    print(start)
    dict["Start-time"] = start
    print("End time:")
    print(end)
    dict["End-time"] = end

    with open("alerts.json", "w") as outfile:
        json.dump(dict, outfile)


# event()
# alert()
# asn = input("Please insert the ASN number:")
asn_info("42020")
