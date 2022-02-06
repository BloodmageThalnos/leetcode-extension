# 通用
from copy import deepcopy
import sys
sys.setrecursionlimit(10008)
mod = 10**9+7

# 随机
from random import random, randint
# random()       [0,1)实数
# randint(a, b)  [a,b]整数

# 计数
from collections import Counter
# Counter('gallahad')              # 从可迭代对象
# Counter({'red': 4, 'blue': 2})   # 从map
# keys(), values()
# most_common()

# 小顶堆
from heapq import heapify, heappush, heappop
# heapify(s) 建堆
# heappush(s, val) 插入元素
# s[0]  访问堆顶
# heappop(s) 弹出堆顶

# 优先队列
from queue import PriorityQueue
# pq.put(x)   
# pq.get(x)   取最小
# pq.qsize()  队列大小

# 双向队列（堆/栈）
from collections import deque
# dq.append
# dq.appendleft
# dq.pop
# dq.popleft
# dq.count

# 有序集合（set）
from sortedcontainers import SortedList
# s = SortedList([1,2,3])