import json
import os
import re
from datetime import datetime

# ABSOLUTE PATHS
STATE_FILE = '/home/prasannakalyan/.openclaw/workspace/mission-control/dashboard_state.json'
HTML_FILE = '/home/prasannakalyan/.openclaw/workspace/mission-control/index.html'

def load_state():
    with open(STATE_FILE, 'r') as f:
        return json.load(f)

def save_state(state):
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def sync_logic():
    state = load_state()
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    # Identify unique incomplete tasks currently in todo_today
    incomplete = []
    seen_tasks = set()
    
    for t in state.get('todo_today', []):
        if t.get('status') == 'completed':
            continue
        
        task_text = t['text']
        if task_text in seen_tasks:
            continue # Skip duplicate
            
        if t.get('date_assigned') != today_str:
            t['late'] = True
            t['date_assigned'] = today_str
        
        incomplete.append(t)
        seen_tasks.add(task_text)
    
    # Add existing backlog items to seen_tasks to avoid re-adding them if they are already in todo_today
    # (Though sync_logic usually pops them from backlog, duplicates occur if backlogs aren't updated)
    
    backlogs = [
        ('backlog_pallidex', 'important_urgent', 'urgent'),
        ('backlog_personal', 'important_urgent', 'urgent'),
        ('backlog_pallidex', 'important_not_urgent', 'wait'),
        ('backlog_personal', 'important_not_urgent', 'wait')
    ]
    
    while len(incomplete) < 3:
        found = False
        for category, priority_list, priority_label in backlogs:
            if state[category][priority_list]:
                # Peek and check for duplicates
                task = state[category][priority_list][0]
                task_text = task['text'] if isinstance(task, dict) else task
                
                if task_text in seen_tasks:
                    state[category][priority_list].pop(0) # Remove duplicate from backlog
                    found = True # Found a duplicate to remove, continue while loop
                    break
                
                # Actual new task
                task = state[category][priority_list].pop(0)
                incomplete.append({
                    "text": task_text,
                    "priority": priority_label,
                    "date_assigned": today_str,
                    "late": False
                })
                seen_tasks.add(task_text)
                found = True
                break
        if not found:
            break
            
    state['todo_today'] = incomplete
    save_state(state)
    return state

def generate_html(state):
    with open(HTML_FILE, 'r') as f:
        content = f.read()

    todo_html = ""
    for t in state['todo_today']:
        priority_class = f"todo-{t.get('priority', 'wait')}"
        late_tag = ' <span class="late-tag">LATE</span>' if t.get('late') else ""
        safe_text = "".join(c if c.isalnum() else "-" for c in t['text'].lower())
        item_id = f"task-{safe_text}"
        check_id = f"check-{safe_text}"
        
        todo_html += f"""                    <li class="list-item {priority_class}" id="{item_id}">
                        {t['text']}{late_tag}
                        <div class="checkbox" id="{check_id}" onclick="toggleTask('{item_id}', '{check_id}')"></div>
                    </li>\n"""

    start_tag = '<!-- TO DO TODAY -->'
    list_start = '<ul class="list">'
    list_end = '</ul>'
    
    if start_tag in content:
        parts = content.split(start_tag, 1)
        after_comment = parts[1]
        if list_start in after_comment:
            list_parts = after_comment.split(list_start, 1)
            remaining = list_parts[1].split(list_end, 1)
            new_content = parts[0] + start_tag + list_parts[0] + list_start + "\n" + todo_html + "                " + list_end + remaining[1]
            
            today_label = datetime.now().strftime("UPDATED_%Y_%m_%d")
            import re
            new_content = re.sub(r'UPDATED_\d{4}_\d{2}_\d{2}_\d{4}', f'{today_label}_0000', new_content)
            
            with open(HTML_FILE, 'w') as f:
                f.write(new_content)
            return True
    return False

if __name__ == "__main__":
    new_state = sync_logic()
    if generate_html(new_state):
        print("Success: De-duplicated Dashboard Update Complete.")
    else:
        print("Error: HTML markers not found.")
