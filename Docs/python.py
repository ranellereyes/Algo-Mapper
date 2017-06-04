#### Unique Items ####

def unique_items(ary):
	count = dict()
	ret = []

	for i in ary:
		if i in count:
			count[i] += 1
		else:
			count[i] = 1

	for key in count:
		if count[key] == 1:
			ret.append(key)

	return ret

#### Pair Sum ####

def pair_sum(ary, target):
	if len(ary) < 2:
		return []

	pairs =[]
	i = 0
	j = 1

	while i < len(ary) - 1:
		while j < len(ary):
			if ary[i] + ary[j] == target:
				pairs.append([i, j])
			j += 1

		i += 1
		j = i + 1

	return pairs

#### Decode ####

def decode(encoded_str):
	decoded_str = ""

	for i in range(0, len(encoded_str), 2):
		decoded_str += encoded_str[i] * int(encoded_str[i + 1])

	return decoded_str

#### Aliquot Sequence ####

def aliquot_sequence(base, n):
	seq = [base]

	for i in range(n - 1):
		base = sum(factors(base))
		seq.append(base)

	return seq

def factors(n): # factors of n excluding itself
	factors = []

	for i in range(1, n):
		if n % i == 0:
			factors.append(i)

	return factors

def aliquot_sequence_rec(base, n):
	if n == 1:
		return [base]

	return [base] + aliquot_sequence_rec(sum(factors(base)), n - 1)

# print aliquot_sequence_rec(10, 4) # => [10, 8, 7, 1]
# print aliquot_sequence_rec(10, 2) # => [10, 8]
# print aliquot_sequence_rec(7, 4) # => [7, 1, 0, 0]

#### Valid Walk ####

def valid_walk(path):
	steps = {'n' : 0, 's' : 0, 'w': 0, 'e': 0}

	for i in path:
		steps[i] += 1

	if steps['n'] == steps['s'] and steps['w'] == steps['e']:
		return True
	else:
		return False

#### Sequence Search ####

def sequence_search(seq, key):
	i = j = 0

	while i < len(key) and j < len(seq):
		if key[i] == seq[j]:
			i += 1
			if i == len(key):
				return True

		j += 1

	return False

#### Winning Streak ####

def winning_streak(record):
	max_wins = curr_wins = i = 0

	while i < len(record) - 1:
		if record[i] == "W":
			curr_wins += 1
		elif record[i] == "L" and record[i + 1] == "W":
			if curr_wins > max_wins:
				max_wins = curr_wins

			curr_wins = 0

		i += 1

	if curr_wins > max_mins:
		max_wins = curr_wins

	return max_wins

#### Five Sort ####

def five_sort(nums):
	sorted_nums = []
	n = 0

	for i in nums:
		if i == 5:
			n += 1
		else:
			sorted_nums.append(i)

	return sorted_nums + ([5] * n)
