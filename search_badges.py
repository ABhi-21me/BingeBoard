import json
with open(r'C:\Users\Abhis\.gemini\antigravity-ide\brain\7fc48b61-38b5-4bcb-96d9-4faabbe2bfe3\.system_generated\logs\transcript.jsonl', encoding='utf-8') as f:
    for line in f:
        if '"type":"USER_INPUT"' in line:
            data = json.loads(line)
            if 'badge' in data['content'].lower():
                print(data['content'])
