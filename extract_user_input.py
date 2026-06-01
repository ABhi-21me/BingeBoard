import json
with open('raw_transcript_line.txt', encoding='utf-8') as f:
    for line in f:
        if '"type":"USER_INPUT"' in line:
            data = json.loads(line)
            print(data['content'])
