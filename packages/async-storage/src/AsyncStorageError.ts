export class AsyncStorageError extends Error {
  private constructor(
    public errorMessage: string,
    public type: AsyncStorageError.Type
  ) {
    super(errorMessage);
    this.name = this.constructor.name;
  }

  static nativeError(e: any): AsyncStorageError {
    const error = getNativeError(e);
    if (!error) {
      return new AsyncStorageError(
        e?.message ?? `Unknown error ${e}`,
        AsyncStorageError.Type.UnknownError
      );
    }

    let errorType: AsyncStorageError.Type = AsyncStorageError.Type.UnknownError;

    switch (error.type) {
      case "SqliteException":
        errorType = AsyncStorageError.Type.SqliteStorageError;
        break;
      case "OtherException":
        errorType = AsyncStorageError.Type.OtherStorageError;
        break;
    }

    return new AsyncStorageError(error.message, errorType);
  }

  static jsError(
    error: string,
    type: AsyncStorageError.Type
  ): AsyncStorageError {
    return new AsyncStorageError(error, type);
  }
}

export namespace AsyncStorageError {
  export enum Type {
    /**
     * Related to RN Native module itself, ex. not initialized or null at app boot
     */
    NativeModuleError = "NativeModuleError",

    /**
     * Error thrown from Sqlite itself
     * https://www.sqlite.org/rescode.html
     */
    SqliteStorageError = "SqliteStorageError",

    /**
     * Other errors related to Native Shared Storage
     * ex. Storage could not be initialized
     */
    OtherStorageError = "OtherStorageError",

    /**
     * Catch-all case, where we can't really tell what went wrong
     */
    UnknownError = "UnknownError",
  }
}

// Native module reject promises with special code
function isNativeError(e: any): e is PotentialNativeError {
  return "message" in e && "code" in e && e?.code === "AsyncStorageError";
}

function getNativeError(e: any): AsyncStorageNativeError | null {
  if (!isNativeError(e)) {
    return null;
  }

  let errorType = e.userInfo ? e.userInfo["type"] : null;

  if (errorType === "SqliteException") {
    return {
      type: "SqliteException",
      message: e.message,
    };
  } else if (errorType === "OtherException") {
    return {
      type: "OtherException",
      message: e.message,
    };
  }

  return null;
}

type AsyncStorageNativeError = {
  message: string;
  type: "SqliteException" | "OtherException";
};

type PotentialNativeError = {
  message: string;
  code: "AsyncStorageError";
  userInfo: Record<string, any> | null;
};
