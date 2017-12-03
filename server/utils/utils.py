import hashlib
import uuid
import random
import json
import os
from flask import Response
from datetime import datetime, date

def uid32(text = None):
    if not text:
        return str(uuid.uuid4()).replace("-", "")
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, text)).replace("-", "")

def hash256(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def json_serial(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def jsonify_respose(data):
    "json化相应对象"
    text = data
    if isinstance(data, dict):
        text = json.dumps(data, default=json_serial, ensure_ascii=False) 
    return Response(
        response= text,
        mimetype="application/json",
        status=200
    )