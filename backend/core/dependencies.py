from ormparams import OrmParamsFastAPI, SuffixSet, DefaultSuffixSet


def get_suffix_set() -> SuffixSet:
    s = DefaultSuffixSet()

    return s


suffix_set = get_suffix_set()
ormparams = OrmParamsFastAPI()
