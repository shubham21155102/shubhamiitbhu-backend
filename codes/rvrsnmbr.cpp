
#include <bitset>
#include <algorithm>
#include <cassert>
#include <cctype>
#include <cmath>
#include <complex>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <deque>
#include <functional>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <limits>
#include <list>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
#include <fstream>
#include <sstream>
using namespace std;
signed main(){
int n=45;
bitset<32>b(n);
vector<int>ans;
for(int i=0;i<32;i++){
    ans.push_back(b[i]);
}
reverse(ans.begin(),ans.end());
int res=0;
for(int i=0;i<32;i++){
    res+=ans[i]*pow(2,i);
}
cout<<res;

return 0;
}
