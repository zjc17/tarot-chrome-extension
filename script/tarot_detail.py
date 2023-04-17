from bs4 import BeautifulSoup
from lxml import etree
import json
import requests

def get_html_doc(url):

  # 发送HTTP请求并获取响应
  response = requests.get(url)

  # 获取HTML内容
  html_content = response.text
  return html_content


def get_card_data(html_doc):
  selector=etree.HTML(html_doc)
  data = {
    "upright": "正位",
    "reversed": "逆位",
    "keyword": "关键词",
    "meaning": "牌义",
    "symbolism": "图案象征",
  }
  lines = selector.xpath('/html/body/main/div/div/div/div/div/p[2]/text()')
  for line in lines:
    line = line.strip()
    print(line)
    if line.startswith('正位'):
      data["upright"] = line.replace('正位：', '')
    elif line.startswith('逆位'):
      data["reversed"] = line.replace('逆位：', '')
    elif line.startswith('關鍵詞'):
      data["keyword"] = line.replace('關鍵詞：', '')
    elif line.startswith('牌義'):
      data["meaning"] = line.replace('牌義：', '')
    elif line.startswith('圖案象徵'):
      data["symbolism"] = line.replace('圖案象徵：', '')
  return data

# 保存 json 结果
def save_json(data):
  json_string = json.dumps(data, ensure_ascii=False)
  with open("data/card_meaning.json", "w", encoding='utf8') as json_file:
    json_file.write(json_string)


result = {}

try:
  for i in range(0, 1):
    print(f"正在获取第 {i} 张牌的数据...")
    html_doc = get_html_doc(f"https://tarothall.com/card/{i}")
    data = get_card_data(html_doc)
    result[i] = data
except Exception as e:
  print(e)

save_json(result)

