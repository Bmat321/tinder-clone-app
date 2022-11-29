<ScrollView>
<View className="flex-1 items-center pt-1">
  <Image
    source={{
      uri: "https://links.papareact.com/2pf",
    }}
    className="w-full h-20"
    resizeMode="contain"
  />

  <Text className="text-xl text-gray-500 p-2 font-bold">
    Welcome {user.displayName}
  </Text>
  <Text className="text-xl text-center text-red-400 p-4 font-bold">
    Step 1: The Profile Pic
  </Text>
  <TextInput
    value={pic}
    onChangeText={(text) => setPic(text)}
    placeholder="Enter a Profile Pic URL"
    className="text-xl text-center pb-2"
  />
  <Text className="text-xl text-center text-red-400 p-4 font-bold">
    Step 2: The Occupation
  </Text>
  <TextInput
    value={job}
    onChangeText={(text) => setJob(text)}
    placeholder="Enter your occupation"
    className="text-xl text-center pb-2"
  />
  <Text className="text-xl text-center text-red-400 p-4 font-bold">
    Step 3: The Age
  </Text>
  <TextInput
    value={age}
    onChangeText={(text) => setAge(text)}
    placeholder="Enter your age"
    className="text-xl text-center pb-2"
    maxLength={2}
    keyboardType="numeric"
  />

  <TouchableOpacity
    disabled={incompleteForm}
    className={`w-64 rounded-xl mt-20 p-3 ${
      incompleteForm ? "bg-gray-400" : "bg-red-400"
    }`}
  >
    <Text className="text-white text-center text-xl">Update profile</Text>
  </TouchableOpacity>
</View>
</ScrollView>