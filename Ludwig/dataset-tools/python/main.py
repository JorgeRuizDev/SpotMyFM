
import argparse


def parseArgs():
    parser = argparse.ArgumentParser(description='Dataset Tools to manage the Ludwig Dataset')
    parser.add_argument('download', 
                    help='Downloads the dataset from a given DynamoDB Dump')

    parser.add_argument('-d', dest='dataset',
                    help='Datset Path', required=True)
    return parser.parse_args()
def main():
    parseArgs()
    pass


if __name__ == "__main__":
    main()